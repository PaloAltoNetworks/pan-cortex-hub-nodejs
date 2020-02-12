// Copyright 2015-2020 Palo Alto Networks, Inc
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//       http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { env } from 'process'
import { CortexCredentialProvider, CredentialProviderOptions, isCredentialItem, StoreItem } from './credentials_provider'
import { commonLogger, logLevel } from '../commonlogger'
import { createCipheriv, createDecipheriv, createHash } from 'crypto'
import * as fs from 'fs'
import { HubError } from './utils'
import { isHubMetadata } from './hubhelper'

const ENV_CLIENT_ID = 'PAN_CLIENT_ID'
const ENV_CLIENT_SECRET = 'PAN_CLIENT_SECRET'
const ENV_SECRET = 'PAN_SECRET'
const CONFIG_FILE = 'PANCLOUD_CONFIG.json'

type ConfigFile<T> = { [dlid: string]: StoreItem<T> }

function isConfigFile<T>(obj: any): obj is ConfigFile<T> {
    return typeof obj == 'object' &&
        Object.entries(obj).every(v =>
            typeof v[0] == 'string' && typeof v[1] !== undefined && v[1] !== null && typeof v[1] == 'object' &&
            (!v[1]['secrets'] || isCredentialItem(v[1]['secrets'])) &&
            isHubMetadata(v[1]['metadata'])
        )
}

/**
 * Implements the CortexCredentialProvider abstract class using a local file as
 * secret vault. Use the static method `factory` to instantiate and object of this class.
 * @typeparam T type of the metadata to attach to any data lake instance
 */
export class FsCredProvider<T> extends CortexCredentialProvider<T> {
    private key: Buffer
    private iv: Buffer
    private configFileName: string

    private constructor(ops: CredentialProviderOptions &
    { clientId: string, clientSecret: string } &
    { key: Buffer, iv: Buffer, configFileName: string }) {
        super(ops)
        this.key = ops.key
        this.iv = ops.iv
        this.configFileName = ops.configFileName
    }

    /**
     * Initializes a `CortexCredentialProvider` subclass that leverages the local filesystem as storage.
     * State data will be stored in the file `PANCLOUD_CONFIG.json` option
     * `configFile` is not provided.
     * Gets all its configuration options either from optional properties of from environmental variables.
     * Important properties in the `ops` object are:
     * @param secret encryption key that will be used to store sensible data at
     * rest. If not provided it will try to get this mandatory value from the
     * environmental variable PAN_SECRET
     * @param configFile file name that will be used to store the secrets
     * @typeparam T type of the metadata to attach to any data lake instance
     * @returns an initializated `FsCredProvider` object
     */
    static async factory<T>(ops?: FsCredProviderOptions): Promise<FsCredProvider<T>> {
        const secret = ops && ops.secret || env[ENV_SECRET]
        if (secret) {
            let { key, iv } = passIvGenerator(secret)
            const cId = env[ENV_CLIENT_ID]
            if (cId) {
                const cSec = env[ENV_CLIENT_SECRET]
                if (cSec) {
                    const configFileName = ops && ops.configFile || CONFIG_FILE
                    try {
                        await promifyFs<fs.Stats>(fs.stat, configFileName)
                    } catch (e) {
                        commonLogger(logLevel.INFO, `${configFileName} does not exist. Creating it`)
                        let blankConfig: ConfigFile<T> = {}
                        await promifyFs<void>(fs.writeFile, configFileName, JSON.stringify(blankConfig))
                    }
                    try {
                        await promifyFs(fs.access, configFileName, fs.constants.W_OK | fs.constants.R_OK)
                    } catch (e) {
                        throw new HubError('HubClient', `Invalid permissions in configuration file ${configFileName}`)
                    }
                    const credProvider = new FsCredProvider<T>({
                        clientId: cId,
                        clientSecret: cSec,
                        key: key,
                        iv: iv,
                        configFileName: configFileName,
                        ...ops
                    })
                    await credProvider.loadDb()
                    return credProvider
                } else {
                    throw new HubError('ConfigError', `Environment variable ${ENV_CLIENT_SECRET} not found or empty value`)
                }
            } else {
                throw new HubError('ConfigError', `Environment variable ${ENV_CLIENT_ID} not found or empty value`)
            }
        } else {
            throw new HubError('ConfigError', `Environment variable ${ENV_SECRET} not found or empty value`)
        }
    }

    private async fullSync(): Promise<void> {
        let configFile: ConfigFile<T> = {}
        Object.entries(this.store).forEach(v => {
            configFile[v[0]] = { ...v[1] }
            if (v[1].secrets) {
                const ciCopy = { ...v[1].secrets }
                let aes = createCipheriv('aes128', this.key, this.iv)
                let payload = Buffer.concat([aes.update(Buffer.from(ciCopy.refreshToken, 'utf8')), aes.final()]).toString('base64')
                ciCopy.refreshToken = payload
                aes = createCipheriv('aes128', this.key, this.iv)
                payload = Buffer.concat([aes.update(Buffer.from(ciCopy.accessToken, 'utf8')), aes.final()]).toString('base64')
                ciCopy.accessToken = payload
                configFile[v[0]].secrets = ciCopy
            }
        })
        try {
            await promifyFs(fs.writeFile, this.configFileName, JSON.stringify(configFile, undefined, ' '))
        } catch (e) {
            throw new HubError('HubClient', e)
        }
    }

    /**
     * Loads the data in the file
     */
    async loadDb(): Promise<void> {
        let jsonConfig: any
        try {
            const configFile = await promifyFs<Buffer>(fs.readFile, this.configFileName)
            jsonConfig = JSON.parse(configFile.toString('utf8'))
        } catch (e) {
            throw new HubError(e)
        }
        if (isConfigFile<T>(jsonConfig)) {
            Object.entries(jsonConfig).forEach(v => {
                if (v[1].secrets) {
                    let aes = createDecipheriv('aes128', this.key, this.iv)
                    let payload = Buffer.concat([aes.update(Buffer.from(v[1].secrets.refreshToken, 'base64')), aes.final()]).toString('utf8')
                    v[1].secrets.refreshToken = payload
                    aes = createDecipheriv('aes128', this.key, this.iv)
                    payload = Buffer.concat([aes.update(Buffer.from(v[1].secrets.accessToken, 'base64')), aes.final()]).toString('utf8')
                    v[1].secrets.accessToken = payload
                }
            })
            commonLogger(logLevel.INFO, `Loaded ${Object.keys(jsonConfig).length} entities from the configuration file ${this.configFileName}`)
            this.store = jsonConfig
            return
        }
        throw new HubError('ParseError', `Invalid configuration file format in ${this.configFileName}`)
    }

    protected upsertStoreItem(datalakeId: string, item: StoreItem<T>): Promise<void> {
        commonLogger(logLevel.INFO, 'Lazy implementation of upsert with full sync operation')
        return this.fullSync()
    }

    protected deleteStoreItem(datalakeId: string): Promise<void> {
        commonLogger(logLevel.INFO, 'Lazy implementation of delete with full sync operation')
        return this.fullSync()
    }

    protected async getStoreItem(datalakeId: string): Promise<StoreItem<T>> {
        return this.store[datalakeId]
    }
}

/**
 * Options for the FS Credentials Provider factory
 */
export interface FsCredProviderOptions extends CredentialProviderOptions {
    /** secret that will be used to cipher / decipher secrets. You better
     * provide it from environmental variables for customer data privacy */
    secret?: string
    /** file that will contain the database. Will be created empty if does not exist */
    configFile?: string
}


function passIvGenerator(secret: string): { key: Buffer, iv: Buffer } {
    let code = createHash('sha1').update(secret).digest()
    let key = code.slice(0, 16)
    let iv = code.slice(4, 20)
    return {
        key: key,
        iv: iv
    }
}

function promifyFs<T>(f: (...args: any[]) => void, ...params: any[]): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        f(...params, (e: Error | undefined, data?: T) => {
            if (e) {
                reject(e)
            }
            resolve(data)
        })
    })
}
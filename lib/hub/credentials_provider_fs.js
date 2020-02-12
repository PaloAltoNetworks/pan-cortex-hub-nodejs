"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const credentials_provider_1 = require("./credentials_provider");
const commonlogger_1 = require("../commonlogger");
const crypto_1 = require("crypto");
const fs = require("fs");
const utils_1 = require("./utils");
const hubhelper_1 = require("./hubhelper");
const ENV_CLIENT_ID = 'PAN_CLIENT_ID';
const ENV_CLIENT_SECRET = 'PAN_CLIENT_SECRET';
const ENV_SECRET = 'PAN_SECRET';
const CONFIG_FILE = 'PANCLOUD_CONFIG.json';
function isConfigFile(obj) {
    return typeof obj == 'object' &&
        Object.entries(obj).every(v => typeof v[0] == 'string' && typeof v[1] !== undefined && v[1] !== null && typeof v[1] == 'object' &&
            (!v[1]['secrets'] || credentials_provider_1.isCredentialItem(v[1]['secrets'])) &&
            hubhelper_1.isHubMetadata(v[1]['metadata']));
}
/**
 * Implements the CortexCredentialProvider abstract class using a local file as
 * secret vault. Use the static method `factory` to instantiate and object of this class.
 * @typeparam T type of the metadata to attach to any data lake instance
 */
class FsCredProvider extends credentials_provider_1.CortexCredentialProvider {
    constructor(ops) {
        super(ops);
        this.key = ops.key;
        this.iv = ops.iv;
        this.configFileName = ops.configFileName;
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
    static async factory(ops) {
        const secret = ops && ops.secret || process_1.env[ENV_SECRET];
        if (secret) {
            let { key, iv } = passIvGenerator(secret);
            const cId = process_1.env[ENV_CLIENT_ID];
            if (cId) {
                const cSec = process_1.env[ENV_CLIENT_SECRET];
                if (cSec) {
                    const configFileName = ops && ops.configFile || CONFIG_FILE;
                    try {
                        await promifyFs(fs.stat, configFileName);
                    }
                    catch (e) {
                        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `${configFileName} does not exist. Creating it`);
                        let blankConfig = {};
                        await promifyFs(fs.writeFile, configFileName, JSON.stringify(blankConfig));
                    }
                    try {
                        await promifyFs(fs.access, configFileName, fs.constants.W_OK | fs.constants.R_OK);
                    }
                    catch (e) {
                        throw new utils_1.HubError('HubClient', `Invalid permissions in configuration file ${configFileName}`);
                    }
                    const credProvider = new FsCredProvider({
                        clientId: cId,
                        clientSecret: cSec,
                        key: key,
                        iv: iv,
                        configFileName: configFileName,
                        ...ops
                    });
                    await credProvider.loadDb();
                    return credProvider;
                }
                else {
                    throw new utils_1.HubError('ConfigError', `Environment variable ${ENV_CLIENT_SECRET} not found or empty value`);
                }
            }
            else {
                throw new utils_1.HubError('ConfigError', `Environment variable ${ENV_CLIENT_ID} not found or empty value`);
            }
        }
        else {
            throw new utils_1.HubError('ConfigError', `Environment variable ${ENV_SECRET} not found or empty value`);
        }
    }
    async fullSync() {
        let configFile = {};
        Object.entries(this.store).forEach(v => {
            configFile[v[0]] = { ...v[1] };
            if (v[1].secrets) {
                const ciCopy = { ...v[1].secrets };
                let aes = crypto_1.createCipheriv('aes128', this.key, this.iv);
                let payload = Buffer.concat([aes.update(Buffer.from(ciCopy.refreshToken, 'utf8')), aes.final()]).toString('base64');
                ciCopy.refreshToken = payload;
                aes = crypto_1.createCipheriv('aes128', this.key, this.iv);
                payload = Buffer.concat([aes.update(Buffer.from(ciCopy.accessToken, 'utf8')), aes.final()]).toString('base64');
                ciCopy.accessToken = payload;
                configFile[v[0]].secrets = ciCopy;
            }
        });
        try {
            await promifyFs(fs.writeFile, this.configFileName, JSON.stringify(configFile, undefined, ' '));
        }
        catch (e) {
            throw new utils_1.HubError('HubClient', e);
        }
    }
    /**
     * Loads the data in the file
     */
    async loadDb() {
        let jsonConfig;
        try {
            const configFile = await promifyFs(fs.readFile, this.configFileName);
            jsonConfig = JSON.parse(configFile.toString('utf8'));
        }
        catch (e) {
            throw new utils_1.HubError(e);
        }
        if (isConfigFile(jsonConfig)) {
            Object.entries(jsonConfig).forEach(v => {
                if (v[1].secrets) {
                    let aes = crypto_1.createDecipheriv('aes128', this.key, this.iv);
                    let payload = Buffer.concat([aes.update(Buffer.from(v[1].secrets.refreshToken, 'base64')), aes.final()]).toString('utf8');
                    v[1].secrets.refreshToken = payload;
                    aes = crypto_1.createDecipheriv('aes128', this.key, this.iv);
                    payload = Buffer.concat([aes.update(Buffer.from(v[1].secrets.accessToken, 'base64')), aes.final()]).toString('utf8');
                    v[1].secrets.accessToken = payload;
                }
            });
            commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Loaded ${Object.keys(jsonConfig).length} entities from the configuration file ${this.configFileName}`);
            this.store = jsonConfig;
            return;
        }
        throw new utils_1.HubError('ParseError', `Invalid configuration file format in ${this.configFileName}`);
    }
    upsertStoreItem(datalakeId, item) {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, 'Lazy implementation of upsert with full sync operation');
        return this.fullSync();
    }
    deleteStoreItem(datalakeId) {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, 'Lazy implementation of delete with full sync operation');
        return this.fullSync();
    }
    async getStoreItem(datalakeId) {
        return this.store[datalakeId];
    }
}
exports.FsCredProvider = FsCredProvider;
function passIvGenerator(secret) {
    let code = crypto_1.createHash('sha1').update(secret).digest();
    let key = code.slice(0, 16);
    let iv = code.slice(4, 20);
    return {
        key: key,
        iv: iv
    };
}
function promifyFs(f, ...params) {
    return new Promise((resolve, reject) => {
        f(...params, (e, data) => {
            if (e) {
                reject(e);
            }
            resolve(data);
        });
    });
}

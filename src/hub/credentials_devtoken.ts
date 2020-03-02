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
import { fetch, ErrorTools } from '../fetch'
import { CredentialsBase } from './credentials'
import { expTokenExtractor, HubError } from './utils'
import { cortexConstants } from '../constants'
import { commonLogger, logLevel } from '../commonlogger'
import { EventEmitter } from 'events'

const ENV_DEVELOPER_TOKEN = 'PAN_DEVELOPER_TOKEN'
const ENV_DEVELOPER_TOKEN_PROVIDER = 'PAN_DEVELOPER_TOKEN_PROVIDER'
const { APIEPMAP, DEV_TOKEN_PROVIDER } = cortexConstants

/**
 * Expected shape of the object returned by the Credentials Provider
 */
export interface DevTokenSrvResponse {
    /**
     * access token value
     */
    access_token: string
}

function isDevTokenSrvResponse(obj: any): obj is DevTokenSrvResponse {
    return obj && typeof obj == 'object' &&
        obj.access_token && typeof obj.access_token == 'string'
}

/**
 * Options to customize a DevTokenCredentials subclass
 */
export interface DevTokenCredentialsOptions {
    /**
     * URI for the developer token provider
     */
    developerTokenProvider?: string,
    /**
     * Developer Token string
     */
    developerToken?: string,
    /**
     * Cortex API fqdn to use (region)
     */
    entryPoint?: string,
    /**
     * Amount of seconds ahead of access_token expiration in which a refresh
     * operation should be attempted
     */
    guardTime?: number
}

/**
 * Implements the Credentials abstract class with the Developer Token mechanism.
 * Use its static `factory` method to instantiate an object of this class.
 */
export class DevTokenCredentials extends CredentialsBase {
    private developerToken: string
    private developerTokenProvider: string
    private guardTime: number
    private accessToken: string
    private validUntil: number
    private emitter: EventEmitter | undefined = undefined
    private errorTools = new ErrorTools(HubError)

    private constructor(entryPoint: string, developerToken: string, developerTokenProvider: string, guardTime: number) {
        super(entryPoint)
        this.developerToken = developerToken
        this.developerTokenProvider = developerTokenProvider
        this.guardTime = guardTime
    }

    /**
     * Factory method to instantiate a DevTokenCredentials class. You must
     * either execute this function in an environment with the variable
     * PAN_DEVELOPER_TOKEN set or provide a value for the `developerToken`
     * option. If Cortex API is not provided (either with the variable
     * ENV_DEVELOPER_TOKEN_PROVIDER or as the `developerTokenProvider` value)
     * then it will default to the _"americas"_ region.
     * @param ops object with configuration options for the class
     * @returns an initializated `DevTokenCredentials` object
     */
    static factory(ops?: DevTokenCredentialsOptions): DevTokenCredentials {
        const developerToken = (ops && ops.developerToken) || env[ENV_DEVELOPER_TOKEN]
        if (!developerToken) {
            throw new HubError('ConfigError', `Environmental variable ${ENV_DEVELOPER_TOKEN} does not exists or contains null data`)
        }
        const tokenProvider = (ops && ops.developerTokenProvider) || env[ENV_DEVELOPER_TOKEN_PROVIDER] || DEV_TOKEN_PROVIDER
        const entryPoint = (ops && ops.entryPoint) || APIEPMAP['americas']
        const guardTime = ops && ops.guardTime || 300
        commonLogger(logLevel.INFO, `Creating Developer Token Credentials (entryPoint:'${entryPoint}' ,tokenProvider:'${tokenProvider}')`)
        return new DevTokenCredentials(entryPoint, developerToken, tokenProvider, guardTime)
    }

    private async devTokenConsume(): Promise<string> {
        let res = await this.errorTools.retrier('ComsError', undefined, undefined, fetch, this.developerTokenProvider, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.developerToken}`
            }
        })
        if (!(res && res.ok)) {
            throw new HubError('ComsError', `non 200 Response from the Developer Token Provider at ${this.developerTokenProvider}`)
        }
        let rJson: any
        try {
            rJson = await res.json()
        } catch (exception) {
            throw new HubError('ParseError', `non valid JSON content received from the Developer Token Provider at ${this.developerTokenProvider}`)
        }
        if (!isDevTokenSrvResponse(rJson)) {
            throw new HubError('ParseError', `non valid access_token property found in the response received from the Developer Token Provider at ${this.developerTokenProvider}`)
        }
        return rJson.access_token
    }

    /**
     * Returns the access token or undefined if no refresh operation has been executed
     * @param force return the access token even if it has not been refreshed
     * @returns the access token if refreshed or `force` equals `true`
     */
    async getToken(force?: boolean): Promise<string | undefined> {
        if (this.accessToken === undefined || Date.now() + this.guardTime * 1000 > this.validUntil * 1000) {
            if (!this.emitter) {
                this.emitter = new EventEmitter();
                this.devTokenConsume().then(token => {
                    this.accessToken = token
                    this.validUntil = expTokenExtractor(token)
                    this.emitter!.emit('data', token)
                }, (e: Error) => {
                    commonLogger(logLevel.INFO, `Error retrieving token (${e.message})`)
                    this.emitter!.emit('data', undefined)
                }).finally(() => {
                    this.emitter = undefined
                })
            }
            return new Promise<string | undefined>((res) => {
                this.emitter!.on('data', res)
            })
        }
        return Promise.resolve((force === true) ? this.accessToken : undefined)
    }
}

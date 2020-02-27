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

import { CortexCredentialProvider, CredentialProviderOptions, StoreItem } from './credentials_provider'
import { commonLogger, logLevel } from '../commonlogger'
import { Credentials } from './credentials'
import { cortexConstants } from '../constants'
import { HubError } from './utils'
import { env } from 'process'
import { SdkError } from '../sdkError'

const { APIEPMAP } = cortexConstants
const PAN_CLIENT_ID = 'PAN_CLIENT_ID'
const PAN_CLIENT_SECRET = 'PAN_CLIENT_SECRET'
const PAN_REFRESH_TOKEN = 'PAN_REFRESH_TOKEN'
const PAN_ENTRYPOINT = 'PAN_ENTRYPOINT'

/**
 * Memory-only implementation of the abstract class `CortexCredentialProvider`
 * to be used for quick starting Cortex API experiments with just one active
 * data lake. You only need to provide the OAuth2 application secret (client_id
 * and client_secret) as well as the refresh token value for the single data
 * lake to experiment with.
 * 
 * Use the static method `factory` to instantiate an object of this class.
 */
export class SimpleCredentialsProvider extends CortexCredentialProvider<never> {
    private constructor(ops: CredentialProviderOptions & { clientId: string, clientSecret: string }) {
        super(ops)
    }

    /**
     * Instantiates a *memory-only* CredentialProvider subclass with only one data lake manually
     * registered. Obtains all configuration values either from provided configuration options or
     * from environmental variables.
     * @param ops.clientId OAUTH2 `client_id` value. If not provided will attempt to get it from the
     * `PAN_CLIENT_ID` environmental variable
     * @param ops.clientSecret OAUTH2 `client_secret` value. If not provided will attempt to get it
     * from the `PAN_CLIENT_SECRET` environmental variable
     * @param ops.refreshToken OAUTH2 `refresh_token` value. If not provided will attempt to get it
     * from the `PAN_REFRESH_TOKEN` environmental variable
     * @param ops.entryPoint Cortex Datalake regiona API entrypoint. If not provided will attempt
     * to get it from the `PAN_ENTRYPOINT` environmental variable
     * @param ops.datalakeId Datalake Indentifier. Defaults to 'DEFAULT'
     * @returns a Credentials object bound to the provided `refresh_token`
     */
    static async factory(ops?: CredentialProviderOptions & {
        clientId?: string,
        clientSecret?: string,
        refreshToken?: string,
        entryPoint?: string,
        datalakeId?: string
    }): Promise<Credentials> {
        let cId = (ops && ops.clientId) ? ops.clientId : env[PAN_CLIENT_ID]
        if (cId) {
            let cSec = (ops && ops.clientSecret) || env[PAN_CLIENT_SECRET]
            if (cSec) {
                let rTok = (ops && ops.refreshToken) || env[PAN_REFRESH_TOKEN]
                if (rTok) {
                    let entryPoint = (ops && ops.entryPoint) || env[PAN_ENTRYPOINT]
                    if (!entryPoint) {
                        entryPoint = APIEPMAP['americas']
                        commonLogger(logLevel.INFO, `PAN_ENTRYPOINT env variable not found. Defaulting to ${entryPoint}`)
                    }
                    return new SimpleCredentialsProvider({
                        clientId: cId,
                        clientSecret: cSec,
                        ...ops
                    }).addWithRefreshToken(ops && ops.datalakeId || 'DEFAULT', entryPoint, rTok)
                } else {
                    throw new HubError('ConfigError', `Environment variable ${PAN_REFRESH_TOKEN} not found or empty value`)
                }
            } else {
                throw new HubError('ConfigError', `Environment variable ${PAN_CLIENT_SECRET} not found or empty value`)
            }
        } else {
            throw new HubError('ConfigError', `Environment variable ${PAN_CLIENT_ID} not found or empty value`)
        }
    }

    async upsertStoreItem(datalakeId: string, item: StoreItem<never>): Promise<void> {
        commonLogger(logLevel.INFO, 'Memory-only credential provider. Discarding operation')
    }

    async deleteStoreItem(datalakeId: string): Promise<void> {
        commonLogger(logLevel.INFO, 'Memory-only credential provider. Discarding operation')
    }

    async getStoreItem(datalakeId: string): Promise<StoreItem<never>> {
        throw new SdkError('ConfigError', 'Memory-only credential provider')
    }

    async loadDb(): Promise<void> {
    }
}

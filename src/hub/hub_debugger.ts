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

import { CortexHubHelper, CortexHelperOptions, HubMetadata } from './hubhelper'
import { CortexCredentialProvider, CredentialsItem, CredentialProviderOptions, StoreItem } from './credentials_provider'
import { commonLogger, logLevel } from '../commonlogger'
import { env } from 'process'
import { HubError } from './utils'

const ENV_CLIENT_ID = 'PAN_CLIENT_ID'
const ENV_CLIENT_SECRET = 'PAN_CLIENT_SECRET'

class CredentialsDebugger extends CortexCredentialProvider<HubMetadata<never>>{
    credItemsStore: { [dlId: string]: CredentialsItem } = {}
    credMetadataStore: { [dlId: string]: undefined | HubMetadata<never> } = {}

    private constructor(clientId: string, clientSecret: string, ops?: CredentialProviderOptions) {
        super({ clientId: clientId, clientSecret: clientSecret, ...ops })
    }

    static factory(ops?: CredentialProviderOptions & {
        clientId?: string,
        clientSecret?: string
    }): CredentialsDebugger {
        let envClientId = ops && ops.clientId || env[ENV_CLIENT_ID]
        let envClientSecret = ops && ops.clientSecret || env[ENV_CLIENT_SECRET]
        if (envClientId) {
            if (envClientSecret) {
                return new CredentialsDebugger(envClientId, envClientSecret, ops)
            } else {
                throw new HubError('ConfigError', `Environment variable ${ENV_CLIENT_SECRET} not found or empty value`)
            }
        } else {
            throw new HubError('ConfigError', `Environment variable ${ENV_CLIENT_ID} not found or empty value`)
        }
    }

    async upsertStoreItem(datalakeId: string, item: StoreItem<HubMetadata<never>>): Promise<void> {
        commonLogger(logLevel.INFO, 'override: upsertStoreItem()')
        commonLogger(logLevel.INFO, `datalakeId: ${datalakeId}`)
        commonLogger(logLevel.INFO, `storeItem: ${JSON.stringify(item)}`)
    }
    async deleteStoreItem(datalakeId: string): Promise<void> {
        commonLogger(logLevel.INFO, 'override: deleteStoreItem()')
        commonLogger(logLevel.INFO, `datalakeId: ${datalakeId}`)
    }
    async getStoreItem(datalakeId: string): Promise<StoreItem<HubMetadata<never>> | undefined> {
        commonLogger(logLevel.INFO, 'override: getStoreItem()')
        commonLogger(logLevel.INFO, `datalakeId: ${datalakeId}`)
        return undefined
    }

    async loadDb(): Promise<void> {
        commonLogger(logLevel.INFO, 'override: loadDb()')
    }
}

/**
 * Convenience `CortexHubHelper` subclass for quick starting experiments with
 * Cortex hub. Use its static method `factory` to instantiate an object for this
 * class
 */
export class HubDebugger extends CortexHubHelper<never> {
    credDebugger: CredentialsDebugger

    private constructor(idpCallbackUrl: string, credDebugger: CredentialsDebugger, ops?: CortexHelperOptions) {
        super(idpCallbackUrl, credDebugger, ops)
        this.credDebugger = credDebugger
    }

    /**
     * Convenience method to instantiate `HubDebugger` objects
     * @param idpCallbackUrl its must be equal to one of the entries in the
     * `auth_redirect_uris` array in the manifest file provided to publish the
     * application in the Cortex hub
     * @param ops configuration options for its parent classes
     * @returns an instantiated `HubDebugger` object
     */
    static factory(idpCallbackUrl: string, ops?: CredentialProviderOptions & CortexHelperOptions & {
        clientId?: string,
        clientSecret?: string
    }): HubDebugger {
        const credDebugger = CredentialsDebugger.factory(ops)
        return new HubDebugger(idpCallbackUrl, credDebugger, ops)
    }

    /**
     * Dumps the internal CredentialsProvider store as a JSON document
     */
    async dumpDatabase(): Promise<string> {
        return JSON.stringify(this.credProvider.store, undefined, 1)
    }
}

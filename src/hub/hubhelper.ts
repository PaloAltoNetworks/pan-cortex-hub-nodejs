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

import { commonLogger, logLevel } from '../commonlogger'
import { cortexConstants } from '../constants'
import { CortexCredentialProvider } from './credentials_provider'
import { Credentials } from './credentials'
import { stringify as qsStringify, parse as qsParse } from 'querystring'
import { URL } from 'url'
import { HubError } from './utils'

const { APIEPMAP, IDP_AUTH_URL } = cortexConstants

/**
 * Describes the `params` object provided by Cortex hub.
 * @typeparams T must extend a string dictionary and is expected to contain the
 * *custom fields* provided by the application in the manifest file
 */
export interface CortexClientParams<T extends { [key: string]: string }> {
    /**
     * Unique ID assigned by Cortex HUB to this application<->datalake combination
     */
    instance_id: string,
    /**
     * Convenient placeholder to allow applications using this SDK attach a friendly name to
     * the Instance ID
     */
    instance_name?: string,
    /**
     * Augmented `region` property provided by Cortex hub. Use the `paramsaParser` method to generate
     * this augmentation out of the BASE64 string provided by Cortex hub
     */
    location: {
        /**
         * Region value as provided by Cortex HUB
         */
        region: string,
        /**
         * Augmented API entry point for the provided region
         */
        entryPoint: string
    }
    /**
     * Serial number of the Cortex Datalake at the other end of this Instance ID
     */
    lsn?: string,
    /**
     * Optional fields requested in the application manifest file
     */
    customFields?: T
}

/**
 * Convenience type guard function to check if a given object conforms to the
 * `CortexClientParams` interface
 * @param obj the object to be checked
 * @returns true if the provided object conforms to the `CortexClientParams` interface
 */
export function isCortexClientParams<T extends { [key: string]: string }>(obj: any): obj is CortexClientParams<T> {
    return obj && obj.instance_id && typeof obj.instance_id == 'string' &&
        obj.instance_name && typeof obj.instance_name == 'string' &&
        (obj.lsn == undefined || typeof obj.lsn == 'string') &&
        obj.location && typeof obj.location == 'object' &&
        obj.location.region && typeof obj.location.region == 'string' &&
        obj.location.entryPoint && typeof obj.location.entryPoint == 'string'
}

/**
 * Metadata attached by HubHelper into CredentialProviders store
 */
export interface HubMetadata<T extends { [key: string]: string }> {
    /**
     * Requester Tenant ID
     */
    tenantId: string,
    /**
     * Requested datalakeID 
     */
    datalakeId: string,
    /**
     * State codes generated for this datalake (pre-authorization)
     */
    stateCode: { [state: string]: boolean }
    /**
     * Decoded params as provided by Cortex Hub
     */
    clientParams: CortexClientParams<T>
}

/**
 * Convenience type guard function to check if an object is a valid HubMetadata type
 * @param obj object to be checked
 */
export function isHubMetadata(obj: any): obj is HubMetadata<never> {
    return obj && typeof obj.tenantId == 'string' &&
        typeof obj.datalakeId == 'string' &&
        obj.stateCode !== null && obj.stateCode !== undefined && typeof obj.stateCode == 'object' &&
        Object.entries(obj.stateCode).every(v => typeof v[0] == 'string' && typeof v[1] == 'boolean') &&
        isCortexClientParams(obj.clientParams)
}

/**
 * Optional configuration attributes for the `CortexHubHelper` class
 */
export interface CortexHelperOptions {
    /**
     * URL of the IDP authorization entry point (defaults to `https://identity.paloaltonetworks.com/as/authorization.oauth2`)
     */
    idpAuthUrl?: string
}

/**
 * Class with methods to help interfacing with the Cortex hub.
 * @typeparam T shape of the key value (custom developer fields) provided by
 * Cortex Hub 
 */
export class CortexHubHelper<T extends { [key: string]: string }> {
    private clientId: string
    private idpAuthUrl: string
    protected credProvider: CortexCredentialProvider<HubMetadata<T>>
    private idpCallbackUrl: string

    /**
     * Constructor method
     * @param idpCallbackUrl One of the URI's provided in the `auth_redirect_uris` field of the manifest file
     * @param credProv a `CortexCredentialProvider` instance that will be used by the `authCallbackHandler` to
     * register new datalakes after activation
     * @param tenantKey the name of the string-like property in `U` that contains the requesting Tenant ID
     * @param ops class configuration options
     */
    constructor(idpCallbackUrl: string, credProv: CortexCredentialProvider<HubMetadata<T>>, ops?: CortexHelperOptions) {
        this.idpAuthUrl = (ops && ops.idpAuthUrl) ? ops.idpAuthUrl : IDP_AUTH_URL
        this.idpCallbackUrl = idpCallbackUrl
        this.clientId = credProv.getClientId()
        this.credProvider = credProv
    }

    private static map(tenantId: string, datalakeId: string): string {
        const b64tid = Buffer.from(tenantId).toString('base64')
        return `${datalakeId}:${b64tid}`
    }

    private static unmap(id: string): { tenantId: string, datalakeId: string } {
        const parts = id.split(':')
        if (parts.length == 2) {
            const tenantId = Buffer.from(parts[1], 'base64').toString()
            return { tenantId, datalakeId: parts[0] }
        }
        throw new HubError('ParseError', `unable to unmap id ${id}`)
    }

    private static stateIdEncode(id: string, seq: number): string {
        return `${seq}-${id}`
    }

    private static stateIdDecode(id: string): { id: string, seq: number } {
        const parts = id.split('-')
        if (parts.length == 2) {
            const seq = Number.parseInt(parts[0])
            if (!isNaN(seq)) {
                return { id: parts[1], seq }
            }
            throw new HubError('ParseError', `sequence is not a number (${id})`)
        }
        throw new HubError('ParseError', `unable to decode id ${id}`)
    }

    /**
     * Prepares an IDP authorization request
     * @param tenantId Requesting Tenant ID (will be store in the authorization state)
     * @param datalakeId Datalake ID willing to activate (will be store in the authorization state)
     * @param scope OAUTH2 Data access Scope(s)
     * @returns a URI ready to be consumed (typically to be used for a client 302 redirect)
     */
    async idpAuthRequest(tenantId: string, datalakeId: string, scope: string[]): Promise<URL> {
        const id = CortexHubHelper.map(tenantId, datalakeId)
        let storeItem = await this.credProvider.storeItem(id)
        if (storeItem && storeItem.metadata) {
            const clientParams = storeItem.metadata.clientParams
            const stateId = CortexHubHelper.stateIdEncode(id, Object.keys(storeItem.metadata.stateCode).length)
            let qsParams: { [index: string]: string } = {
                response_type: 'code',
                client_id: this.clientId,
                redirect_uri: this.idpCallbackUrl,
                scope: scope.join(' '),
                instance_id: clientParams.instance_id,
                region: clientParams.location.region,
                state: stateId
            }
            let urlString = `${this.idpAuthUrl}?${qsStringify(qsParams)}`
            storeItem.metadata.stateCode[stateId] = true
            await this.credProvider.storeItem(id, storeItem)
            commonLogger(logLevel.INFO, `Providing IDP Auth URL: ${urlString}`)
            return new URL(urlString)
        } else {
            throw new HubError('HubClient', `Store does not include metadada for item ${tenantId}/${datalakeId}`)
        }
    }

    /**
     * Completes the OAuth2 code grant flow and returns a valid Credentials
     * object for the just authorized datalake
     * @param code OAuth2 code value
     * @param stateId state value returned by the IDP service
     * @param tId tenant identifier
     * @returns a valid Credentials object for this authorized data lake
     */
    async idpAuthCallback(code: string, stateId: string, tId: string): Promise<Credentials> {
        const { id } = CortexHubHelper.stateIdDecode(stateId)
        const { tenantId } = CortexHubHelper.unmap(id)
        if (tId == tenantId) {
            const storeItem = await this.credProvider.storeItem(id)
            if (storeItem && storeItem.metadata) {
                if (storeItem.metadata.stateCode[stateId] === true) {
                    storeItem.metadata.stateCode = {}
                    return this.credProvider.addWithCode(
                        id,
                        storeItem.metadata.clientParams.location.entryPoint,
                        { code, idpCallbackUrl: this.idpCallbackUrl },
                        storeItem.metadata)
                } else {
                    throw new HubError('HubClient', `state id not found (${stateId})`)
                }
            } else {
                throw new HubError('HubClient', `Item not found in store (${id})`)
            }
        } else {
            throw new HubError('HubClient', `Tenant Id mismatch (${tId}/${tenantId})`)
        }
    }

    /**
     * Parses the CortexHub BASE64 params string into a CortexClientParams object
     * @param params Input string
     * @param tenantId the resulting client params will be registered in the CredentialsProvider store
     * @returns the parsed object
     */
    async hubParamsRegister(params: string, tenantId: string): Promise<CortexClientParams<T>> {
        let b64Decoded = ''
        try {
            b64Decoded = Buffer.from(params, 'base64').toString()
        } catch (e) {
            throw new HubError('ParseError', `${params} is not a valid base64 string`)
        }
        let parsed = qsParse(b64Decoded)
        if (!(parsed.instance_id && typeof parsed.instance_id == 'string')) {
            throw new HubError('ParseError', `Missing mandatory instance_id in ${params}`)
        }
        if (!(parsed.region && typeof parsed.region == 'string')) {
            throw new HubError('ParseError', `Missing or invalid region in ${params}`)
        }
        let cParams: CortexClientParams<T> = {
            instance_id: parsed.instance_id,
            location: { region: parsed.region, entryPoint: APIEPMAP[parsed.region] }
        }
        delete parsed.instance_id
        delete parsed.region
        if (parsed.instance_name && typeof parsed.instance_name == 'string') {
            cParams.instance_name = parsed.instance_name
            delete parsed.instance_name
        }
        if (parsed.lsn && typeof parsed.lsn == 'string') {
            cParams.lsn = parsed.lsn
            delete parsed.lsn
        }
        try {
            let customField = (JSON.parse(JSON.stringify(parsed)) as T)
            cParams.customFields = customField
        } catch (e) {
            commonLogger(new HubError('ParseError', e))
        }
        const id = CortexHubHelper.map(tenantId, cParams.instance_id)
        await this.credProvider.storeItem(id, {
            metadata: {
                clientParams: cParams,
                datalakeId: cParams.instance_id,
                stateCode: {},
                tenantId: tenantId
            }
        })
        return cParams
    }

    /**
     * Retrieves the list of datalakes registered under this tenant
     * @param tenantId requesting Tenant ID
     * @returns an array with two columns: data lake id and params reported by
     * the Cortex hub
     */
    async listDatalake(tenantId: string): Promise<({ id: string, doc: CortexClientParams<T> })[]> {
        await this.credProvider.loadDb(this.credProvider.store)
        return (await this.credProvider.storeItem()).
            filter(x => x.metadata && x.metadata.tenantId == tenantId).
            map(x => ({ id: x.metadata!.datalakeId, doc: x.metadata!.clientParams }))
    }

    /**
     * Retrieve the list of data lake id's that has been successfully authorized
     * by the user
     * @param tenantId requesting Tenant ID
     * @returns and array with all data lake id's owned by the provided tenant
     * identifier that contain secrets
     */
    async listActiveDatalake(tenantId: string): Promise<string[]> {
        await this.credProvider.loadDb(this.credProvider.store)
        return (await this.credProvider.storeItem()).
            filter(x => x.secrets && x.metadata && x.metadata.tenantId == tenantId).
            map(x => x.metadata!.datalakeId)
    }

    /**
     * Gets metadata of a given Datalake ID as a `CortexClientParams` object
     * @param tenantId requesting Tenant ID
     * @param datalakeId ID of the Datalake
     * @returns the reported Cortex hub params for this data lake
     */
    async getDatalake(tenantId: string, datalakeId: string): Promise<CortexClientParams<T> | undefined> {
        const entry = (await this.listDatalake(tenantId)).find(x => x.id == datalakeId)
        if (entry) {
            return entry.doc
        }
        return entry
    }

    /**
     * Deletes a datalake metadata record
     * @param tenantId requesting Tenant ID
     * @param datalakeId ID of the datalake
     */
    async deleteDatalake(tenantId: string, datalakeId: string): Promise<void> {
        return this.credProvider.deleteDatalake(CortexHubHelper.map(tenantId, datalakeId))
    }

    /**
     * Get a credentials object for this tenant data lake combination
     * @param tenantId tenant identifier
     * @param datalakeId data lake identifier
     * @returns a `Credentials` object valid for the provided identifiers
     */
    async getCredentialsObject(tenantId: string, datalakeId: string): Promise<Credentials> {
        const id = CortexHubHelper.map(tenantId, datalakeId)
        const storeItem = await this.credProvider.storeItem(id)
        if (storeItem) {
            const itemSecrets = storeItem.secrets
            if (itemSecrets) {
                return this.credProvider.getCredentialsObject(id)
            } else {
                throw new HubError('HubClient', `Datalake has not being authorized yet (${tenantId}/${datalakeId})`)
            }
        } else {
            throw new HubError('HubClient', `Datalake ${datalakeId} does not exist in the store (tenant: ${tenantId})`)
        }
    }
}

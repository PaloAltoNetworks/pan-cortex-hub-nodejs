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
import { Credentials } from './credentials'
import { fetch, FetchOptions, ErrorTools } from '../fetch'
import { HubError } from './utils'
import { cortexConstants } from '../constants'
import { EventEmitter } from 'events'

const ACCESS_GUARD = 300 // 5 minutes
const { IDP_REVOKE_URL, IDP_TOKEN_URL } = cortexConstants

/**
 * Represents an raw Cortex IDP credential set 
 */
interface IdpResponse {
    /**
     * JWT access_token value
     */
    access_token: string,
    /**
     * Optional new refresh_token value
     */
    refresh_token?: string,
    /**
     * Expiration duration (in seconds)
     */
    expires_in: string
}

/**
 * Cortex credential set with additional `validUntil` field
 */
export type AugmentedIdpResponse = IdpResponse & {
    /**
     * Unix TS (seconds) that mark this access_token expiration time
     */
    validUntil: number
}

function parseIdpResponse(obj: any): AugmentedIdpResponse {
    if (!(typeof obj.access_token == 'string' &&
        typeof obj.expires_in == 'string' &&
        (obj.refresh_tokens === undefined || typeof obj.refresh_tokens == 'string'))
    ) {
        throw new HubError('ParseError', `Invalid response received from IDP refresh operation: '${JSON.stringify(obj)}'`)
    }
    let expiresIn = Number.parseInt(obj.expires_in)
    if (isNaN(expiresIn)) {
        throw new HubError('ParseError', `Invalid response received from IDP refresh operation: '${JSON.stringify(obj)}'`)
    }
    return {
        validUntil: Math.floor(Date.now() / 1000) + expiresIn,
        ...obj
    }
}

interface IdpErrorResponse {
    error: string
    error_description: string
}

/**
 * Data Lake storage item
 */
export interface StoreItem<T> {
    /**
     * Optional metadata 
     */
    metadata?: T
    /**
     * OAuth2 secrets and related data
     */
    secrets?: CredentialsItem
}

/**
 * SDK Representation of a Cortex credential set
 */
export interface CredentialsItem {
    /**
     * JWT access_token value
     */
    accessToken: string
    /**
     * Unix timestamp (in seconds) that mark the expiration time for this access_token
     */
    validUntil: number
    /**
     * Cortex API fqdn (region) in which this access_token is valid
     */
    entryPoint: string
    /**
     * refresh_token value bound to this access_token
     */
    refreshToken: string
    /**
     * data lake identifier (application instance id)
     */
    datalakeId: string
}

/**
 * Conveniente type guard to check an object against the `CredentialsItem` interface
 * @param obj object to check
 */
export function isCredentialItem(obj: any): obj is CredentialsItem {
    return typeof obj == 'object' &&
        obj.accessToken && typeof obj.accessToken == 'string' &&
        obj.validUntil && typeof obj.validUntil == 'number' &&
        obj.datalakeId && typeof obj.datalakeId == 'string'
}

function isIdpErrorResponse(obj: any): obj is IdpErrorResponse {
    return (obj.error !== undefined && typeof obj.error == 'string' &&
        obj.error_description !== undefined && typeof obj.error_description == 'string')
}

/**
 * Methods that deal with secret storage
 */
export interface SecretsStorage<T> {
    /**
     * Creates of updates a secrets object belonging to a specific data lake identifier
     * @param datalakeId the data lake unique identifier
     * @param item secrets object
     */
    upsertStoreItem(datalakeId: string, item: StoreItem<T>): Promise<void>

    /**
     * Removes an object from the store
     * @param datalakeId the data lake unique identifier
     */
    deleteStoreItem(datalakeId: string): Promise<void>;

    /**
     * Returns a secrets object from the store.
     * 
     * @param datalakeId the data lake unique identifier
     * @returns the secrets object or undefined if it doesn't exists
     */
    getStoreItem(datalakeId: string): Promise<StoreItem<T> | undefined>;

    /**
     * Loads secrets stored externaly into the in-memory store. Implementator
     * should compare the passed object with the external store contents and
     * update the former accordingly.
     * 
     * @param store refrence to the current in-memory store
     */
    loadDb(store: { [dlid: string]: StoreItem<T> }): Promise<void>;
}

/**
 * Configuration options for a `CortexCredentialProvider` class
 */
export interface CredentialProviderOptions {
    /**
     * IDP Token Operation Entry Point. Defaults to `https://api.paloaltonetworks.com/api/oauth2/RequestToken`
     */
    idpTokenUrl?: string
    /**
     * IDP Token Revoke Entry Point. Defaults to `https://api.paloaltonetworks.com/api/oauth2/RevokeToken`
     */
    idpRevokeUrl?: string
    /**
     * How soon to expiration before the access token is automatically refreshed. Defaults to `300` (5 minutes)
     */
    accTokenGuardTime?: number
    /**
     * How many attempts to contact IDP before giving up. Defaults to `3`
     */
    retrierAttempts?: number
    /**
     * How many milliseconds to wait between retry attempts. Defauls to `100` milliseconds
     */
    retrierDelay?: number
}

/**
 * Abstract class to provide credentials for multiple datalakes. If you want to
 * extend this class then you must implement its storage-related methods. *`T`*
 * describes the type of the optional metadata that can be attached to any
 * datalake's record.
 * @typeparam T type of the metadata to attach to any data lake instance
*/
export abstract class CortexCredentialProvider<T> implements SecretsStorage<T> {
    private clientId: string
    private clientSecret: string
    private idpTokenUrl: string
    private idpRevokeUrl: string
    store: { [dlid: string]: StoreItem<T> }
    private retrierAttempts?: number
    private retrierDelay?: number
    private accTokenGuardTime: number
    private emitter: EventEmitter | undefined = undefined
    private errorTools = new ErrorTools(HubError)

    /**
     * Class constructor
     * @param ops constructor options. Mandatory fields being OAUTH2 `clientId` and `clientSecret`
     */
    protected constructor(ops: CredentialProviderOptions & {
        clientId: string, clientSecret: string
    }) {
        this.clientId = ops.clientId
        this.clientSecret = ops.clientSecret
        this.idpTokenUrl = (ops.idpTokenUrl) ? ops.idpTokenUrl : IDP_TOKEN_URL
        this.idpRevokeUrl = (ops.idpRevokeUrl) ? ops.idpRevokeUrl : IDP_REVOKE_URL
        this.accTokenGuardTime = (ops.accTokenGuardTime) ? ops.accTokenGuardTime : ACCESS_GUARD
        this.retrierAttempts = ops.retrierAttempts
        this.retrierDelay = ops.retrierDelay
        this.store = {}
        this.emitter = undefined
        if (this.accTokenGuardTime > 3300) {
            throw new HubError('ConfigError', `Property 'accTokenGuardTime' must be, at max 3300 seconds (${this.accTokenGuardTime})`)
        }
    }

    /**
     * Exposes the OAuth2 application client_id
     * @returns this CredentialProvider class OAUTH2 `clientId`
     */
    getClientId(): string {
        return this.clientId
    }

    /**
     * Exposes the internal store. It does not deep-copy the objects so take
     * extra care when modifying its content. Do not use this method unless you
     * know what you're doing
     * @param dlid store item identifier
     * @param value if provided then it will be used to update the internal store
     */
    async storeItem(dlid: string): Promise<StoreItem<T> | undefined>
    async storeItem(dlid: string, value: StoreItem<T>): Promise<void>
    async storeItem(): Promise<StoreItem<T>[]>
    async storeItem(dlid?: string, value?: StoreItem<T>): Promise<StoreItem<T>[] | StoreItem<T> | undefined | void> {
        if (dlid) {
            await this.lazyInitStoreItem(dlid)
            if (value) {
                this.store[dlid] = value
                await this.upsertStoreItem(dlid, value)
            }
            return this.store[dlid]
        }
        return Object.values(this.store)
    }

    private async lazyInitStoreItem(dlid: string): Promise<void> {
        if (!this.store[dlid]) {
            const sItem = await this.getStoreItem(dlid)
            if (sItem) {
                this.store[dlid] = sItem
            }
        }
    }

    private async idpRefresh(param: FetchOptions): Promise<AugmentedIdpResponse> {
        let res = await this.errorTools.retrier('ComsError', this.retrierAttempts, this.retrierDelay, fetch, this.idpTokenUrl, param)
        if (!(res && res.ok)) {
            throw new HubError('ComsError', `HTTP Error from IDP refresh operation ${res.status} ${res.statusText}`)
        }
        let rJson: any
        try {
            rJson = await res.json()
        } catch (exception) {
            throw new HubError('ParseError', `Invalid JSON refresh response: ${exception.message}`)
        }
        if (isIdpErrorResponse(rJson)) {
            throw new HubError('ParseError', rJson.error_description)
        }
        let augmentedResponse = parseIdpResponse(rJson)
        commonLogger(logLevel.INFO, 'Authorization token successfully retrieved')
        return augmentedResponse
    }

    private async idpRevoke(param: FetchOptions): Promise<void> {
        let res = await this.errorTools.retrier('ComsError', this.retrierAttempts, this.retrierDelay, fetch, this.idpRevokeUrl, param)
        if (!(res && res.ok)) {
            throw new HubError('ComsError', `HTTP Error from IDP refresh operation ${res.status} ${res.statusText}`)
        }
        let rJson: any
        try {
            rJson = await res.json()
        } catch (exception) {
            throw new HubError('ParseError', `Invalid JSON revoke response: ${exception.message}`)
        }
        if (rJson.issuccess && typeof rJson.issuccess == 'string' && rJson.issuccess == 'true') {
            return
        }
        throw JSON.stringify(rJson)
    }

    /**
     * Implements the Cortex Datalake OAUTH2 refresh token operation
     */
    private refreshAccessToken(refreshToken: string): Promise<AugmentedIdpResponse> {
        let param: FetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "client_id": this.clientId,
                "client_secret": this.clientSecret,
                "refresh_token": refreshToken,
                "grant_type": "refresh_token"
            }),
            timeout: 30000
        }
        return this.idpRefresh(param)
    }

    /**
     * Use to exchange an OAuth2 code for its corresponding secrets (OAuth2 code
     * grant flow)
     * @param code OAuth2 code value
     * @param idpCallbackUrl OAuth2 callback value
     * @returns The IDP response
     */
    private fetchToken(code: string, idpCallbackUrl: string): Promise<AugmentedIdpResponse> {
        let param: FetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "client_id": this.clientId,
                "client_secret": this.clientSecret,
                "redirect_uri": idpCallbackUrl,
                "grant_type": "authorization_code",
                "code": code
            })
        }
        return this.idpRefresh(param)
    }

    /**
     * Issues a new credentials object for a datalake you have static access to its `refreshToken`.
     * @param datalakeId ID for this datalake
     * @param entryPoint Cortex Datalake regional entry point
     * @param refreshToken OAUTH2 `refresh_token` value
     * @param prefetch You can provide the `access_token` and `valid_until` values if you also have
     * access to them to avoid the initial token refresh operation
     * @param metadata context data to be stored alongside the secrets
     * @returns a `Credentials` object for the new registered data lake
     */
    async addWithRefreshToken(datalakeId: string, entryPoint: string,
        refreshToken: string, prefetch?: { accessToken: string, validUntil: number }, metadata?: T): Promise<Credentials> {
        let accessToken: string
        let validUntil: number
        if (prefetch) {
            ({ accessToken, validUntil } = prefetch)
        } else {
            let idpResponse = await this.refreshAccessToken(refreshToken)
            if (idpResponse.refresh_token) {
                refreshToken = idpResponse.refresh_token
                commonLogger(logLevel.INFO, `Received new Cortex Refresh Token for datalake ID ${datalakeId} from Identity Provider`)
            }
            ({ access_token: accessToken, validUntil } = idpResponse)
            commonLogger(logLevel.INFO, `Retrieved Cortex Access Token for datalake ID ${datalakeId} from Identity Provider`)
        }
        const credItem: CredentialsItem = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            entryPoint: entryPoint,
            datalakeId: datalakeId,
            validUntil: validUntil,
        }
        const storeItem: StoreItem<T> = {
            metadata: metadata,
            secrets: credItem
        }
        this.store[datalakeId] = storeItem
        await this.upsertStoreItem(datalakeId, storeItem)
        commonLogger(logLevel.INFO, `Issued new Credentials Object for datalake ID ${datalakeId}`)
        return this.buildCredentialsObject(datalakeId, entryPoint)
    }

    /**
     * Issues a new credentials object for a datalake you have static access to
     * its initial code.
     * @param datalakeId ID for this datalake
     * @param entryPoint Cortex Datalake regional entry point
     * @param oa2code OAUTH2 `code` and `idpCallbackUrl` value required to
     * complete the code grant flow
     * @param metadata context data to be stored alongside the secrets
     * @returns a `Credentials` object for the new registered data lake
     */
    async addWithCode(datalakeId: string, entryPoint: string,
        oa2code: { code: string, idpCallbackUrl: string }, metadata?: T): Promise<Credentials> {
        let accessToken: string
        let validUntil: number
        let refreshToken: string | undefined
        let idpResponse = await this.fetchToken(oa2code.code, oa2code.idpCallbackUrl);
        ({ access_token: accessToken, refresh_token: refreshToken, validUntil } = idpResponse)
        if (refreshToken) {
            const credItem: CredentialsItem = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                entryPoint: entryPoint,
                datalakeId: datalakeId,
                validUntil: validUntil,
            }
            const storeItem: StoreItem<T> = {
                metadata: metadata,
                secrets: credItem
            }
            this.store[datalakeId] = storeItem
            await this.upsertStoreItem(datalakeId, storeItem)
            commonLogger(logLevel.INFO, `Issued new Credentials Object for datalake ID ${datalakeId}`)
            return this.buildCredentialsObject(datalakeId, entryPoint)
        } else {
            throw new HubError('HubClient', `IDP response for datalake ${datalakeId} authorization does not contain refresh_token value`)
        }
    }

    /**
     * Retrieves the Credentials object for a given datalake
     * @param datalakeId ID of the datalake the Credentials object should be bound to
     * @returns a `Credentials` object for the requested data lake
     */
    async getCredentialsObject(datalakeId: string): Promise<Credentials> {
        await this.lazyInitStoreItem(datalakeId)
        const storeItem = this.store[datalakeId]
        if (storeItem) {
            const itemSecret = storeItem.secrets
            if (itemSecret) {
                commonLogger(logLevel.INFO, `Providing credentials object for datalake ID ${datalakeId}`)
                return this.buildCredentialsObject(datalakeId, itemSecret.entryPoint)
            } else {
                throw new HubError('HubClient', `Datalake ${datalakeId} do not have secrets yet`)
            }
        } else {
            throw new HubError('HubClient', `Record for datalake ${datalakeId} not available`)
        }
    }

    /**
     * Revokes a previous authorized datalake (revokes its OAUTH2 `refresh_token`)
     * @param datalakeId ID of the datalake to be removed
     */
    async revokeDatalake(datalakeId: string): Promise<void> {
        await this.lazyInitStoreItem(datalakeId)
        const storeItem = this.store[datalakeId]
        if (storeItem) {
            const itemSecret = storeItem.secrets
            if (itemSecret) {
                let param: FetchOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        "client_id": this.clientId,
                        "client_secret": this.clientSecret,
                        "token": itemSecret.refreshToken,
                        "token_type_hint": "refresh_token"
                    })
                }
                try {
                    await this.idpRevoke(param)
                    commonLogger(logLevel.INFO, `Successfully revoked refresh token for datalake ${datalakeId}`)
                    storeItem.secrets = undefined
                    return this.upsertStoreItem(datalakeId, storeItem)
                } catch (e) {
                    commonLogger(logLevel.WARNING, `Non expected revoke response received by IDP ${e}`)
                }
            } else {
                commonLogger(logLevel.INFO, `Request to revoke a non-authorized datalake ${datalakeId}. Ignoring it`)
            }
        } else {
            commonLogger(logLevel.INFO, `Request to revoke a non existant datalake ${datalakeId}. Ignoring it`)
        }
    }

    /**
     * Completely removes a datalake from the store (it revokes the refresh
     * token if already authorized)
     * @param datalakeId ID of the datalake to be removed
     */
    async deleteDatalake(datalakeId: string): Promise<void> {
        await this.revokeDatalake(datalakeId)
        delete this.store[datalakeId]
        commonLogger(logLevel.INFO, `Deleting datalake ${datalakeId} from the store`)
        return this.deleteStoreItem(datalakeId)
    }

    /**
     * Main method used by a bound Credentials object. Returns the current `access_token` and its
     * expiration time. It auto-refreshes the `access_token` if needed based on the `accTokenGuardTime`
     * class configuration option
     * @param datalakeId ID of the datalake to obtain `access_token` from
     * @param force to force refresh operation even if current access token is in its validity zone
     * @returns details about the refresh operation
     */
    async getAccessToken(datalakeId: string, force = false): Promise<string | undefined> {
        await this.lazyInitStoreItem(datalakeId)
        const storeItem = this.store[datalakeId]
        if (storeItem) {
            const itemSecret = storeItem.secrets
            if (itemSecret) {
                if (Date.now() + this.accTokenGuardTime * 1000 > itemSecret.validUntil * 1000) {
                    if (!this.emitter) {
                        this.emitter = new EventEmitter();
                        this.refreshAccessToken(itemSecret.refreshToken).then(async idpResponse => {
                            itemSecret.accessToken = idpResponse.access_token
                            itemSecret.validUntil = idpResponse.validUntil
                            if (idpResponse.refresh_token) {
                                itemSecret.refreshToken = idpResponse.refresh_token
                                commonLogger(logLevel.INFO, 'Received new Cortex Refresh Token')
                            }
                            await this.upsertStoreItem(datalakeId, storeItem)
                            this.emitter!.emit('data', idpResponse.access_token)
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
                return Promise.resolve((force === true) ? itemSecret.accessToken : undefined)
            } else {
                throw new HubError('HubClient', `Datalake ${datalakeId} do not have secrets yet`)
            }
        } else {
            throw new HubError('HubClient', `Datalake ${datalakeId} not in database`)
        }
    }

    private buildCredentialsObject(datalakeId: string, entryPoint: string): Credentials {
        return {
            getToken: ((force = false) => this.getAccessToken(datalakeId, force)),
            getEntryPoint: (() => entryPoint)
        }
    }

    /**
     * Implementation dependant. Must create or update the corresponfing item in
     * the store
     * @param datalakeId datalake identificator
     * @param item element to be stored
     * @param metadata optional metadata (used by multitenant applications to attach tenant ID)
     */
    abstract upsertStoreItem(datalakeId: string, item: StoreItem<T>): Promise<void>

    /**
     * Implementation dependant. Must delete an item from the store
     * @param datalakeId datalake identificator
     */
    abstract deleteStoreItem(datalakeId: string): Promise<void>

    /**
     * Implementation dependant. Must return the store item
     * @param datalakeId datalake identificator
     * @returns the corresponding item from the store
     */
    abstract getStoreItem(datalakeId: string): Promise<StoreItem<T> | undefined>

    /**
     * Implementation dependant. A way to trigger the external DB initial load must be provided.
     * The subclass implementation should compare the protected object `store`
     * with the external data and update it if needed.
     * @param store refrence to the current in-memory store
     */
    abstract loadDb(store: { [dlid: string]: StoreItem<T> }): Promise<void>

}

/**
 * Buils a CortexCredentialsObject from provided options and storage object
 * 
 * @param ops configuration options
 * @param storage object implementing the secrets storage interface
 * @returns an instantiated CortexCredentialsProvider object
 */
export function cortexCredentialsProviderFactory<T>(
    ops: CredentialProviderOptions & { clientId: string, clientSecret: string },
    storage: SecretsStorage<T>
): CortexCredentialProvider<T> {
    return new (class FactCredsProvider extends CortexCredentialProvider<T> {
        upsertStoreItem(datalakeId: string, item: StoreItem<T>): Promise<void> {
            return storage.upsertStoreItem(datalakeId, item)
        }
        deleteStoreItem(datalakeId: string): Promise<void> {
            return storage.deleteStoreItem(datalakeId)
        }
        getStoreItem(datalakeId: string): Promise<StoreItem<T> | undefined> {
            return storage.getStoreItem(datalakeId)
        }
        loadDb(store: { [dlid: string]: StoreItem<T> }): Promise<void> {
            return storage.loadDb(store)
        }
        constructor(ops: CredentialProviderOptions & {
            clientId: string, clientSecret: string
        }) {
            super(ops);
        }
    })(ops)
}


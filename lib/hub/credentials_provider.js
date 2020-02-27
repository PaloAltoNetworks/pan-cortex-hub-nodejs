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
const commonlogger_1 = require("../commonlogger");
const fetch_1 = require("../fetch");
const utils_1 = require("./utils");
const constants_1 = require("../constants");
const events_1 = require("events");
const ACCESS_GUARD = 300; // 5 minutes
const { IDP_REVOKE_URL, IDP_TOKEN_URL } = constants_1.cortexConstants;
function parseIdpResponse(obj) {
    if (!(typeof obj.access_token == 'string' &&
        typeof obj.expires_in == 'string' &&
        (obj.refresh_tokens === undefined || typeof obj.refresh_tokens == 'string'))) {
        throw new utils_1.HubError('ParseError', `Invalid response received from IDP refresh operation: '${JSON.stringify(obj)}'`);
    }
    let expiresIn = Number.parseInt(obj.expires_in);
    if (isNaN(expiresIn)) {
        throw new utils_1.HubError('ParseError', `Invalid response received from IDP refresh operation: '${JSON.stringify(obj)}'`);
    }
    return {
        validUntil: Math.floor(Date.now() / 1000) + expiresIn,
        ...obj
    };
}
/**
 * Conveniente type guard to check an object against the `CredentialsItem` interface
 * @param obj object to check
 */
function isCredentialItem(obj) {
    return typeof obj == 'object' &&
        obj.accessToken && typeof obj.accessToken == 'string' &&
        obj.validUntil && typeof obj.validUntil == 'number' &&
        obj.datalakeId && typeof obj.datalakeId == 'string';
}
exports.isCredentialItem = isCredentialItem;
function isIdpErrorResponse(obj) {
    return (obj.error !== undefined && typeof obj.error == 'string' &&
        obj.error_description !== undefined && typeof obj.error_description == 'string');
}
/**
 * Abstract class to provide credentials for multiple datalakes. If you want to
 * extend this class then you must implement its storage-related methods. *`T`*
 * describes the type of the optional metadata that can be attached to any
 * datalake's record.
 * @typeparam T type of the metadata to attach to any data lake instance
*/
class CortexCredentialProvider {
    /**
     * Class constructor
     * @param ops constructor options. Mandatory fields being OAUTH2 `clientId` and `clientSecret`
     */
    constructor(ops) {
        this.emitter = undefined;
        this.errorTools = new fetch_1.ErrorTools(utils_1.HubError);
        this.clientId = ops.clientId;
        this.clientSecret = ops.clientSecret;
        this.idpTokenUrl = (ops.idpTokenUrl) ? ops.idpTokenUrl : IDP_TOKEN_URL;
        this.idpRevokeUrl = (ops.idpRevokeUrl) ? ops.idpRevokeUrl : IDP_REVOKE_URL;
        this.accTokenGuardTime = (ops.accTokenGuardTime) ? ops.accTokenGuardTime : ACCESS_GUARD;
        this.retrierAttempts = ops.retrierAttempts;
        this.retrierDelay = ops.retrierDelay;
        this.store = {};
        this.emitter = undefined;
        if (this.accTokenGuardTime > 3300) {
            throw new utils_1.HubError('ConfigError', `Property 'accTokenGuardTime' must be, at max 3300 seconds (${this.accTokenGuardTime})`);
        }
    }
    /**
     * Exposes the OAuth2 application client_id
     * @returns this CredentialProvider class OAUTH2 `clientId`
     */
    getClientId() {
        return this.clientId;
    }
    async storeItem(dlid, value) {
        if (dlid) {
            await this.lazyInitStoreItem(dlid);
            if (value) {
                this.store[dlid] = value;
                await this.upsertStoreItem(dlid, value);
            }
            return this.store[dlid];
        }
        return Object.values(this.store);
    }
    async lazyInitStoreItem(dlid) {
        if (!this.store[dlid]) {
            const sItem = await this.getStoreItem(dlid);
            if (sItem) {
                this.store[dlid] = sItem;
            }
        }
    }
    async idpRefresh(param) {
        let res = await this.errorTools.retrier('ComsError', this.retrierAttempts, this.retrierDelay, fetch_1.fetch, this.idpTokenUrl, param);
        if (!(res && res.ok)) {
            throw new utils_1.HubError('ComsError', `HTTP Error from IDP refresh operation ${res.status} ${res.statusText}`);
        }
        let rJson;
        try {
            rJson = await res.json();
        }
        catch (exception) {
            throw new utils_1.HubError('ParseError', `Invalid JSON refresh response: ${exception.message}`);
        }
        if (isIdpErrorResponse(rJson)) {
            throw new utils_1.HubError('ParseError', rJson.error_description);
        }
        let augmentedResponse = parseIdpResponse(rJson);
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, 'Authorization token successfully retrieved');
        return augmentedResponse;
    }
    async idpRevoke(param) {
        let res = await this.errorTools.retrier('ComsError', this.retrierAttempts, this.retrierDelay, fetch_1.fetch, this.idpRevokeUrl, param);
        if (!(res && res.ok)) {
            throw new utils_1.HubError('ComsError', `HTTP Error from IDP refresh operation ${res.status} ${res.statusText}`);
        }
        let rJson;
        try {
            rJson = await res.json();
        }
        catch (exception) {
            throw new utils_1.HubError('ParseError', `Invalid JSON revoke response: ${exception.message}`);
        }
        if (rJson.issuccess && typeof rJson.issuccess == 'string' && rJson.issuccess == 'true') {
            return;
        }
        throw JSON.stringify(rJson);
    }
    /**
     * Implements the Cortex Datalake OAUTH2 refresh token operation
     */
    refreshAccessToken(refreshToken) {
        let param = {
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
        };
        return this.idpRefresh(param);
    }
    /**
     * Use to exchange an OAuth2 code for its corresponding secrets (OAuth2 code
     * grant flow)
     * @param code OAuth2 code value
     * @param idpCallbackUrl OAuth2 callback value
     * @returns The IDP response
     */
    fetchToken(code, idpCallbackUrl) {
        let param = {
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
        };
        return this.idpRefresh(param);
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
    async addWithRefreshToken(datalakeId, entryPoint, refreshToken, prefetch, metadata) {
        let accessToken;
        let validUntil;
        if (prefetch) {
            ({ accessToken, validUntil } = prefetch);
        }
        else {
            let idpResponse = await this.refreshAccessToken(refreshToken);
            if (idpResponse.refresh_token) {
                refreshToken = idpResponse.refresh_token;
                commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Received new Cortex Refresh Token for datalake ID ${datalakeId} from Identity Provider`);
            }
            ({ access_token: accessToken, validUntil } = idpResponse);
            commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Retrieved Cortex Access Token for datalake ID ${datalakeId} from Identity Provider`);
        }
        const credItem = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            entryPoint: entryPoint,
            datalakeId: datalakeId,
            validUntil: validUntil,
        };
        const storeItem = {
            metadata: metadata,
            secrets: credItem
        };
        this.store[datalakeId] = storeItem;
        await this.upsertStoreItem(datalakeId, storeItem);
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Issued new Credentials Object for datalake ID ${datalakeId}`);
        return this.buildCredentialsObject(datalakeId, entryPoint);
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
    async addWithCode(datalakeId, entryPoint, oa2code, metadata) {
        let accessToken;
        let validUntil;
        let refreshToken;
        let idpResponse = await this.fetchToken(oa2code.code, oa2code.idpCallbackUrl);
        ({ access_token: accessToken, refresh_token: refreshToken, validUntil } = idpResponse);
        if (refreshToken) {
            const credItem = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                entryPoint: entryPoint,
                datalakeId: datalakeId,
                validUntil: validUntil,
            };
            const storeItem = {
                metadata: metadata,
                secrets: credItem
            };
            this.store[datalakeId] = storeItem;
            await this.upsertStoreItem(datalakeId, storeItem);
            commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Issued new Credentials Object for datalake ID ${datalakeId}`);
            return this.buildCredentialsObject(datalakeId, entryPoint);
        }
        else {
            throw new utils_1.HubError('HubClient', `IDP response for datalake ${datalakeId} authorization does not contain refresh_token value`);
        }
    }
    /**
     * Retrieves the Credentials object for a given datalake
     * @param datalakeId ID of the datalake the Credentials object should be bound to
     * @returns a `Credentials` object for the requested data lake
     */
    async getCredentialsObject(datalakeId) {
        await this.lazyInitStoreItem(datalakeId);
        const storeItem = this.store[datalakeId];
        if (storeItem) {
            const itemSecret = storeItem.secrets;
            if (itemSecret) {
                commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Providing credentials object for datalake ID ${datalakeId}`);
                return this.buildCredentialsObject(datalakeId, itemSecret.entryPoint);
            }
            else {
                throw new utils_1.HubError('HubClient', `Datalake ${datalakeId} do not have secrets yet`);
            }
        }
        else {
            throw new utils_1.HubError('HubClient', `Record for datalake ${datalakeId} not available`);
        }
    }
    /**
     * Revokes a previous authorized datalake (revokes its OAUTH2 `refresh_token`)
     * @param datalakeId ID of the datalake to be removed
     */
    async revokeDatalake(datalakeId) {
        await this.lazyInitStoreItem(datalakeId);
        const storeItem = this.store[datalakeId];
        if (storeItem) {
            const itemSecret = storeItem.secrets;
            if (itemSecret) {
                let param = {
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
                };
                try {
                    await this.idpRevoke(param);
                    commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Successfully revoked refresh token for datalake ${datalakeId}`);
                    storeItem.secrets = undefined;
                    return this.upsertStoreItem(datalakeId, storeItem);
                }
                catch (e) {
                    commonlogger_1.commonLogger(commonlogger_1.logLevel.WARNING, `Non expected revoke response received by IDP ${e}`);
                }
            }
            else {
                commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Request to revoke a non-authorized datalake ${datalakeId}. Ignoring it`);
            }
        }
        else {
            commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Request to revoke a non existant datalake ${datalakeId}. Ignoring it`);
        }
    }
    /**
     * Completely removes a datalake from the store (it revokes the refresh
     * token if already authorized)
     * @param datalakeId ID of the datalake to be removed
     */
    async deleteDatalake(datalakeId) {
        await this.revokeDatalake(datalakeId);
        delete this.store[datalakeId];
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Deleting datalake ${datalakeId} from the store`);
        return this.deleteStoreItem(datalakeId);
    }
    /**
     * Main method used by a bound Credentials object. Returns the current `access_token` and its
     * expiration time. It auto-refreshes the `access_token` if needed based on the `accTokenGuardTime`
     * class configuration option
     * @param datalakeId ID of the datalake to obtain `access_token` from
     * @param force to force refresh operation even if current access token is in its validity zone
     * @returns details about the refresh operation
     */
    async getAccessToken(datalakeId, force = false) {
        await this.lazyInitStoreItem(datalakeId);
        const storeItem = this.store[datalakeId];
        if (storeItem) {
            const itemSecret = storeItem.secrets;
            if (itemSecret) {
                if (Date.now() + this.accTokenGuardTime * 1000 > itemSecret.validUntil * 1000) {
                    if (!this.emitter) {
                        this.emitter = new events_1.EventEmitter();
                        this.refreshAccessToken(itemSecret.refreshToken).then(async (idpResponse) => {
                            itemSecret.accessToken = idpResponse.access_token;
                            itemSecret.validUntil = idpResponse.validUntil;
                            if (idpResponse.refresh_token) {
                                itemSecret.refreshToken = idpResponse.refresh_token;
                                commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, 'Received new Cortex Refresh Token');
                            }
                            await this.upsertStoreItem(datalakeId, storeItem);
                            this.emitter.emit('data', idpResponse.access_token);
                        }, (e) => {
                            commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Error retrieving token (${e.message})`);
                            this.emitter.emit('data', undefined);
                        }).finally(() => {
                            this.emitter = undefined;
                        });
                    }
                    return new Promise((res) => {
                        this.emitter.on('data', res);
                    });
                }
                return Promise.resolve((force === true) ? itemSecret.accessToken : undefined);
            }
            else {
                throw new utils_1.HubError('HubClient', `Datalake ${datalakeId} do not have secrets yet`);
            }
        }
        else {
            throw new utils_1.HubError('HubClient', `Datalake ${datalakeId} not in database`);
        }
    }
    buildCredentialsObject(datalakeId, entryPoint) {
        return {
            getToken: ((force = false) => this.getAccessToken(datalakeId, force)),
            getEntryPoint: (() => entryPoint)
        };
    }
}
exports.CortexCredentialProvider = CortexCredentialProvider;
/**
 * Buils a CortexCredentialsObject from provided options and storage object
 *
 * @param ops configuration options
 * @param storage object implementing the secrets storage interface
 * @returns an instantiated CortexCredentialsProvider object
 */
function cortexCredentialsProviderFactory(ops, storage) {
    return new (class FactCredsProvider extends CortexCredentialProvider {
        upsertStoreItem(datalakeId, item) {
            return storage.upsertStoreItem(datalakeId, item);
        }
        deleteStoreItem(datalakeId) {
            return storage.deleteStoreItem(datalakeId);
        }
        getStoreItem(datalakeId) {
            return storage.getStoreItem(datalakeId);
        }
        loadDb(store) {
            return storage.loadDb(store);
        }
        constructor(ops) {
            super(ops);
        }
    })(ops);
}
exports.cortexCredentialsProviderFactory = cortexCredentialsProviderFactory;

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
const constants_1 = require("../constants");
const querystring_1 = require("querystring");
const url_1 = require("url");
const utils_1 = require("./utils");
const { APIEPMAP, IDP_AUTH_URL } = constants_1.cortexConstants;
/**
 * Convenience type guard function to check if a given object conforms to the
 * `CortexClientParams` interface
 * @param obj the object to be checked
 * @returns true if the provided object conforms to the `CortexClientParams` interface
 */
function isCortexClientParams(obj) {
    return obj && obj.instance_id && typeof obj.instance_id == 'string' &&
        obj.instance_name && typeof obj.instance_name == 'string' &&
        (obj.lsn == undefined || typeof obj.lsn == 'string') &&
        obj.location && typeof obj.location == 'object' &&
        obj.location.region && typeof obj.location.region == 'string' &&
        obj.location.entryPoint && typeof obj.location.entryPoint == 'string';
}
exports.isCortexClientParams = isCortexClientParams;
/**
 * Convenience type guard function to check if an object is a valid HubMetadata type
 * @param obj object to be checked
 */
function isHubMetadata(obj) {
    return obj && typeof obj.tenantId == 'string' &&
        typeof obj.datalakeId == 'string' &&
        obj.stateCode !== null && obj.stateCode !== undefined && typeof obj.stateCode == 'object' &&
        Object.entries(obj.stateCode).every(v => typeof v[0] == 'string' && typeof v[1] == 'boolean') &&
        isCortexClientParams(obj.clientParams);
}
exports.isHubMetadata = isHubMetadata;
/**
 * Class with methods to help interfacing with the Cortex hub.
 * @typeparam T shape of the key value (custom developer fields) provided by
 * Cortex Hub
 */
class CortexHubHelper {
    /**
     * Constructor method
     * @param idpCallbackUrl One of the URI's provided in the `auth_redirect_uris` field of the manifest file
     * @param credProv a `CortexCredentialProvider` instance that will be used by the `authCallbackHandler` to
     * register new datalakes after activation
     * @param tenantKey the name of the string-like property in `U` that contains the requesting Tenant ID
     * @param ops class configuration options
     */
    constructor(idpCallbackUrl, credProv, ops) {
        this.idpAuthUrl = (ops && ops.idpAuthUrl) ? ops.idpAuthUrl : IDP_AUTH_URL;
        this.idpCallbackUrl = idpCallbackUrl;
        this.clientId = credProv.getClientId();
        this.credProvider = credProv;
    }
    static map(tenantId, datalakeId) {
        const b64tid = Buffer.from(tenantId).toString('base64');
        return `${datalakeId}:${b64tid}`;
    }
    static unmap(id) {
        const parts = id.split(':');
        if (parts.length == 2) {
            const tenantId = Buffer.from(parts[1], 'base64').toString();
            return { tenantId, datalakeId: parts[0] };
        }
        throw new utils_1.HubError('ParseError', `unable to unmap id ${id}`);
    }
    static stateIdEncode(id, seq) {
        return `${seq}-${id}`;
    }
    static stateIdDecode(id) {
        const parts = id.split('-');
        if (parts.length == 2) {
            const seq = Number.parseInt(parts[0]);
            if (!isNaN(seq)) {
                return { id: parts[1], seq };
            }
            throw new utils_1.HubError('ParseError', `sequence is not a number (${id})`);
        }
        throw new utils_1.HubError('ParseError', `unable to decode id ${id}`);
    }
    /**
     * Prepares an IDP authorization request
     * @param tenantId Requesting Tenant ID (will be store in the authorization state)
     * @param datalakeId Datalake ID willing to activate (will be store in the authorization state)
     * @param scope OAUTH2 Data access Scope(s)
     * @returns a URI ready to be consumed (typically to be used for a client 302 redirect)
     */
    async idpAuthRequest(tenantId, datalakeId, scope) {
        const id = CortexHubHelper.map(tenantId, datalakeId);
        let storeItem = await this.credProvider.storeItem(id);
        if (storeItem && storeItem.metadata) {
            const clientParams = storeItem.metadata.clientParams;
            const stateId = CortexHubHelper.stateIdEncode(id, Object.keys(storeItem.metadata.stateCode).length);
            let qsParams = {
                response_type: 'code',
                client_id: this.clientId,
                redirect_uri: this.idpCallbackUrl,
                scope: scope.join(' '),
                instance_id: clientParams.instance_id,
                region: clientParams.location.region,
                state: stateId
            };
            let urlString = `${this.idpAuthUrl}?${querystring_1.stringify(qsParams)}`;
            storeItem.metadata.stateCode[stateId] = true;
            await this.credProvider.storeItem(id, storeItem);
            commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Providing IDP Auth URL: ${urlString}`);
            return new url_1.URL(urlString);
        }
        else {
            throw new utils_1.HubError('HubClient', `Store does not include metadada for item ${tenantId}/${datalakeId}`);
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
    async idpAuthCallback(code, stateId, tId) {
        const { id } = CortexHubHelper.stateIdDecode(stateId);
        const { tenantId } = CortexHubHelper.unmap(id);
        if (tId == tenantId) {
            const storeItem = await this.credProvider.storeItem(id);
            if (storeItem && storeItem.metadata) {
                if (storeItem.metadata.stateCode[stateId] === true) {
                    storeItem.metadata.stateCode = {};
                    return this.credProvider.addWithCode(id, storeItem.metadata.clientParams.location.entryPoint, { code, idpCallbackUrl: this.idpCallbackUrl }, storeItem.metadata);
                }
                else {
                    throw new utils_1.HubError('HubClient', `state id not found (${stateId})`);
                }
            }
            else {
                throw new utils_1.HubError('HubClient', `Item not found in store (${id})`);
            }
        }
        else {
            throw new utils_1.HubError('HubClient', `Tenant Id mismatch (${tId}/${tenantId})`);
        }
    }
    /**
     * Parses the CortexHub BASE64 params string into a CortexClientParams object
     * @param params Input string
     * @param tenantId the resulting client params will be registered in the CredentialsProvider store
     * @returns the parsed object
     */
    async hubParamsRegister(params, tenantId) {
        let b64Decoded = '';
        try {
            b64Decoded = Buffer.from(params, 'base64').toString();
        }
        catch (e) {
            throw new utils_1.HubError('ParseError', `${params} is not a valid base64 string`);
        }
        let parsed = querystring_1.parse(b64Decoded);
        if (!(parsed.instance_id && typeof parsed.instance_id == 'string')) {
            throw new utils_1.HubError('ParseError', `Missing mandatory instance_id in ${params}`);
        }
        if (!(parsed.region && typeof parsed.region == 'string')) {
            throw new utils_1.HubError('ParseError', `Missing or invalid region in ${params}`);
        }
        let cParams = {
            instance_id: parsed.instance_id,
            location: { region: parsed.region, entryPoint: APIEPMAP[parsed.region] }
        };
        delete parsed.instance_id;
        delete parsed.region;
        if (parsed.instance_name && typeof parsed.instance_name == 'string') {
            cParams.instance_name = parsed.instance_name;
            delete parsed.instance_name;
        }
        if (parsed.lsn && typeof parsed.lsn == 'string') {
            cParams.lsn = parsed.lsn;
            delete parsed.lsn;
        }
        try {
            let customField = JSON.parse(JSON.stringify(parsed));
            cParams.customFields = customField;
        }
        catch (e) {
            commonlogger_1.commonLogger(new utils_1.HubError('ParseError', e));
        }
        const id = CortexHubHelper.map(tenantId, cParams.instance_id);
        await this.credProvider.storeItem(id, {
            metadata: {
                clientParams: cParams,
                datalakeId: cParams.instance_id,
                stateCode: {},
                tenantId: tenantId
            }
        });
        return cParams;
    }
    /**
     * Retrieves the list of datalakes registered under this tenant
     * @param tenantId requesting Tenant ID
     * @returns an array with two columns: data lake id and params reported by
     * the Cortex hub
     */
    async listDatalake(tenantId) {
        await this.credProvider.loadDb();
        return (await this.credProvider.storeItem()).
            filter(x => x.metadata && x.metadata.tenantId == tenantId).
            map(x => ({ id: x.metadata.datalakeId, doc: x.metadata.clientParams }));
    }
    /**
     * Retrieve the list of data lake id's that has been successfully authorized
     * by the user
     * @param tenantId
     * @returns and array with all data lake id's owned by the provided tenant
     * identifier that contain secrets
     */
    async listActiveDatalake(tenantId) {
        await this.credProvider.loadDb();
        return (await this.credProvider.storeItem()).
            filter(x => x.secrets && x.metadata && x.metadata.tenantId == tenantId).
            map(x => x.metadata.datalakeId);
    }
    /**
     * Gets metadata of a given Datalake ID as a `CortexClientParams` object
     * @param tenantId requesting Tenant ID
     * @param datalakeId ID of the Datalake
     * @returns the reported Cortex hub params for this data lake
     */
    async getDatalake(tenantId, datalakeId) {
        const entry = (await this.listDatalake(tenantId)).find(x => x.id == datalakeId);
        if (entry) {
            return entry.doc;
        }
        return entry;
    }
    /**
     * Deletes a datalake metadata record
     * @param tenantId requesting Tenant ID
     * @param datalakeId ID of the datalake
     */
    async deleteDatalake(tenantId, datalakeId) {
        return this.credProvider.deleteDatalake(CortexHubHelper.map(tenantId, datalakeId));
    }
    /**
     * Get a credentials object for this tenant data lake combination
     * @param tenantId tenant identifier
     * @param datalakeId data lake identifier
     * @returns a `Credentials` object valid for the provided identifiers
     */
    async getCredentialsObject(tenantId, datalakeId) {
        const id = CortexHubHelper.map(tenantId, datalakeId);
        const storeItem = await this.credProvider.storeItem(id);
        if (storeItem) {
            const itemSecrets = storeItem.secrets;
            if (itemSecrets) {
                return this.credProvider.getCredentialsObject(id);
            }
            else {
                throw new utils_1.HubError('HubClient', `Datalake has not being authorized yet (${tenantId}/${datalakeId})`);
            }
        }
        else {
            throw new utils_1.HubError('HubClient', `Datalake ${datalakeId} does not exist in the store (tenant: ${tenantId})`);
        }
    }
}
exports.CortexHubHelper = CortexHubHelper;

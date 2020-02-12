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
const hubhelper_1 = require("./hubhelper");
const credentials_provider_1 = require("./credentials_provider");
const commonlogger_1 = require("../commonlogger");
const process_1 = require("process");
const utils_1 = require("./utils");
const ENV_CLIENT_ID = 'PAN_CLIENT_ID';
const ENV_CLIENT_SECRET = 'PAN_CLIENT_SECRET';
class CredentialsDebugger extends credentials_provider_1.CortexCredentialProvider {
    constructor(clientId, clientSecret, ops) {
        super({ clientId: clientId, clientSecret: clientSecret, ...ops });
        this.credItemsStore = {};
        this.credMetadataStore = {};
    }
    static factory(ops) {
        let envClientId = ops && ops.clientId || process_1.env[ENV_CLIENT_ID];
        let envClientSecret = ops && ops.clientSecret || process_1.env[ENV_CLIENT_SECRET];
        if (envClientId) {
            if (envClientSecret) {
                return new CredentialsDebugger(envClientId, envClientSecret, ops);
            }
            else {
                throw new utils_1.HubError('ConfigError', `Environment variable ${ENV_CLIENT_SECRET} not found or empty value`);
            }
        }
        else {
            throw new utils_1.HubError('ConfigError', `Environment variable ${ENV_CLIENT_ID} not found or empty value`);
        }
    }
    async upsertStoreItem(datalakeId, item) {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, 'override: upsertStoreItem()');
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `datalakeId: ${datalakeId}`);
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `storeItem: ${JSON.stringify(item)}`);
    }
    async deleteStoreItem(datalakeId) {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, 'override: deleteStoreItem()');
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `datalakeId: ${datalakeId}`);
    }
    async getStoreItem(datalakeId) {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, 'override: getStoreItem()');
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `datalakeId: ${datalakeId}`);
        return undefined;
    }
    async loadDb() {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, 'override: loadDb()');
    }
}
/**
 * Convenience `CortexHubHelper` subclass for quick starting experiments with
 * Cortex hub. Use its static method `factory` to instantiate an object for this
 * class
 */
class HubDebugger extends hubhelper_1.CortexHubHelper {
    constructor(idpCallbackUrl, credDebugger, ops) {
        super(idpCallbackUrl, credDebugger, ops);
        this.credDebugger = credDebugger;
    }
    /**
     * Convenience method to instantiate `HubDebugger` objects
     * @param idpCallbackUrl its must be equal to one of the entries in the
     * `auth_redirect_uris` array in the manifest file provided to publish the
     * application in the Cortex hub
     * @param ops configuration options for its parent classes
     * @returns an instantiated `HubDebugger` object
     */
    static factory(idpCallbackUrl, ops) {
        const credDebugger = CredentialsDebugger.factory(ops);
        return new HubDebugger(idpCallbackUrl, credDebugger, ops);
    }
    /**
     * Dumps the internal CredentialsProvider store as a JSON document
     */
    async dumpDatabase() {
        return JSON.stringify(await this.credProvider.storeItem(), undefined, 1);
    }
}
exports.HubDebugger = HubDebugger;

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
const fetch_1 = require("../fetch");
const credentials_1 = require("./credentials");
const utils_1 = require("./utils");
const constants_1 = require("../constants");
const commonlogger_1 = require("../commonlogger");
const events_1 = require("events");
const ENV_DEVELOPER_TOKEN = 'PAN_DEVELOPER_TOKEN';
const ENV_DEVELOPER_TOKEN_PROVIDER = 'PAN_DEVELOPER_TOKEN_PROVIDER';
const { APIEPMAP, DEV_TOKEN_PROVIDER } = constants_1.cortexConstants;
function isDevTokenSrvResponse(obj) {
    return obj && typeof obj == 'object' &&
        obj.access_token && typeof obj.access_token == 'string';
}
/**
 * Implements the Credentials abstract class with the Developer Token mechanism.
 * Use its static `factory` method to instantiate an object of this class.
 */
class DevTokenCredentials extends credentials_1.CredentialsBase {
    constructor(entryPoint, developerToken, developerTokenProvider, guardTime) {
        super(entryPoint);
        this.emitter = undefined;
        this.errorTools = new fetch_1.ErrorTools(utils_1.HubError);
        this.developerToken = developerToken;
        this.developerTokenProvider = developerTokenProvider;
        this.guardTime = guardTime;
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
    static factory(ops) {
        const developerToken = (ops && ops.developerToken) || process_1.env[ENV_DEVELOPER_TOKEN];
        if (!developerToken) {
            throw new utils_1.HubError('ConfigError', `Environmental variable ${ENV_DEVELOPER_TOKEN} does not exists or contains null data`);
        }
        const tokenProvider = (ops && ops.developerTokenProvider) || process_1.env[ENV_DEVELOPER_TOKEN_PROVIDER] || DEV_TOKEN_PROVIDER;
        const entryPoint = (ops && ops.entryPoint) || APIEPMAP['americas'];
        const guardTime = ops && ops.guardTime || 300;
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, `Creating Developer Token Credentials (entryPoint:'${entryPoint}' ,tokenProvider:'${tokenProvider}')`);
        return new DevTokenCredentials(entryPoint, developerToken, tokenProvider, guardTime);
    }
    async devTokenConsume() {
        let res = await this.errorTools.retrier('ComsError', undefined, undefined, fetch_1.fetch, this.developerTokenProvider, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.developerToken}`
            }
        });
        if (!(res && res.ok)) {
            throw new utils_1.HubError('ComsError', `non 200 Response from the Developer Token Provider at ${this.developerTokenProvider}`);
        }
        let rJson;
        try {
            rJson = await res.json();
        }
        catch (exception) {
            throw new utils_1.HubError('ParseError', `non valid JSON content received from the Developer Token Provider at ${this.developerTokenProvider}`);
        }
        if (!isDevTokenSrvResponse(rJson)) {
            throw new utils_1.HubError('ParseError', `non valid access_token property found in the response received from the Developer Token Provider at ${this.developerTokenProvider}`);
        }
        return rJson.access_token;
    }
    /**
     * Returns the access token or undefined if no refresh operation has been executed
     * @param force return the access token even if it has not been refreshed
     * @returns the access token if refreshed or `force` equals `true`
     */
    async getToken(force) {
        if (this.accessToken === undefined || Date.now() + this.guardTime * 1000 > this.validUntil * 1000) {
            if (!this.emitter) {
                this.emitter = new events_1.EventEmitter();
                this.devTokenConsume().then(token => {
                    this.accessToken = token;
                    this.validUntil = utils_1.expTokenExtractor(token);
                    this.emitter.emit('data', token);
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
        return Promise.resolve((force === true) ? this.accessToken : undefined);
    }
}
exports.DevTokenCredentials = DevTokenCredentials;

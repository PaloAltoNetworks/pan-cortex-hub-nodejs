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
const credentials_devtoken_1 = require("./credentials_devtoken");
const credentials_provider_simple_1 = require("./credentials_provider_simple");
const credentials_static_1 = require("./credentials_static");
const commonlogger_1 = require("../commonlogger");
const process_1 = require("process");
const constants_1 = require("../constants");
const utils_1 = require("./utils");
const { APIEPMAP } = constants_1.cortexConstants;
/**
 * Convenience function for getting started that will do its best to build a
 * Credentials object for you. It will use either values provided in the optiona
 * `opt` parameter or environmental variables equivalents and attempt, in order:
 * - `DevTokenCredentials` class (PAN_DEVELOPER_TOKEN env variable found)
 * - `SimpleCredentialsProvider` class (PAN_CLIENT_ID & PAN_CLIENT_SECRET &
 *   PAN_REFRESH_TOKEN env variables found)
 * - `StaticCredentials` class (PAN_ACCESS_TOKEN env variable found)
 * @param opt any option from CredentialProviderOptions or
 * DevTokenCredentialsOptions plus optional explicits values for `accessToken`,
 * `refreshToken` and `entryPoint`
 * @returns a valid `Credentials` object for the identificators provided
 */
async function autoCredentials(opt) {
    let envClientId = process_1.env['PAN_CLIENT_ID'];
    let envClientSecret = process_1.env['PAN_CLIENT_SECRET'];
    let envRefreshToken = (opt && opt.refreshToken) || process_1.env['PAN_REFRESH_TOKEN'];
    let envAccessToken = (opt && opt.accessToken) || process_1.env['PAN_ACCESS_TOKEN'];
    let envEntryPoint = process_1.env['PAN_ENTRYPOINT'];
    let entryPoint = APIEPMAP['americas'];
    if (envEntryPoint) {
        entryPoint = envEntryPoint;
    }
    else {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, 'Environmental variable PAN_ENTRYPOINT not set. Assuming ' + entryPoint);
    }
    if (!(envAccessToken || (envClientId && envClientSecret && envRefreshToken))) {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, 'Neither "PAN_ACCESS_TOKEN" (for static credentials) nor "PAN_CLIENT_ID", "PAN_CLIENT_SECRET" and "PAN_REFRESH_TOKEN" for a memory-based credentials provider where provider. Will try with developer token credetials');
        let devTokCredentias = credentials_devtoken_1.DevTokenCredentials.factory({ entryPoint: entryPoint, ...opt });
        return devTokCredentias;
    }
    if (envClientId && envClientSecret && envRefreshToken) {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, 'Using memory based credentials provider');
        return credentials_provider_simple_1.SimpleCredentialsProvider.factory({
            clientId: envClientId,
            clientSecret: envClientSecret,
            refreshToken: envRefreshToken,
            entryPoint: entryPoint,
            ...opt
        });
    }
    if (envAccessToken) {
        commonlogger_1.commonLogger(commonlogger_1.logLevel.INFO, 'Using startic credentials. No refresh available.');
        return new credentials_static_1.StaticCredentials(envAccessToken, entryPoint);
    }
    throw new utils_1.HubError('HubClient', 'Unknown error');
}
exports.autoCredentials = autoCredentials;

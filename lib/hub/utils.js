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
const sdkError_1 = require("../sdkError");
const crypto_1 = require("crypto");
function expTokenExtractor(token) {
    let parts = token.split('.');
    if (parts.length != 3) {
        throw new HubError('ParseError', 'Not a valid JWT token format');
    }
    let expAttribute;
    try {
        expAttribute = JSON.parse(Buffer.from(parts[1], 'base64').toString()).exp;
    }
    catch (_a) {
        throw new HubError('ParseError', 'Not a valid JWT token format');
    }
    if (typeof expAttribute != 'number') {
        throw new HubError('ParseError', 'JWT token does not have a valid "exp" field');
    }
    return expAttribute;
}
exports.expTokenExtractor = expTokenExtractor;
class HubError extends sdkError_1.SdkError {
    constructor(errorType, ...params) {
        super(errorType, ...(params.length > 0 && params[0] instanceof Error) ? [params[0].message] : params);
        this.name = 'provider.hub.sdk.cortex';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HubError);
        }
    }
}
exports.HubError = HubError;
function uuid(content) {
    return crypto_1.createHash('sha256').update(content).digest('base64');
}
exports.uuid = uuid;

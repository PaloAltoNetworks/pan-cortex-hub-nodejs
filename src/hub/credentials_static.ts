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

import { CredentialsBase } from './credentials'

/**
 * A Credentials implementation that just wraps a explicitly provided
 * access_token. Any refresh call will fail so it will last as long as the
 * provided access_token expiration date. Use the static method `factory` to
 * instantiate an object of this class
 */
export class StaticCredentials extends CredentialsBase {
    private token: string;

    constructor(token: string, entryPoint: string) {
        super(entryPoint);
        this.token = token;
    }

    getToken(force?: boolean): Promise<string | undefined> {
        return Promise.resolve((force === true) ? this.token : undefined);
    }
}

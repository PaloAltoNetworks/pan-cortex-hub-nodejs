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

import { CredentialProviderOptions } from './credentials_provider'
import { DevTokenCredentialsOptions, DevTokenCredentials } from './credentials_devtoken'
import { SimpleCredentialsProvider } from './credentials_provider_simple'
import { StaticCredentials } from './credentials_static'
import { Credentials } from './credentials'
import { commonLogger, logLevel } from '../commonlogger'
import { env } from 'process'
import { cortexConstants } from '../constants'
import { HubError } from './utils'

const { APIEPMAP } = cortexConstants

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
export async function autoCredentials(opt?: CredentialProviderOptions & DevTokenCredentialsOptions &
{ accessToken?: string, refreshToken?: string, entryPoint?: string }): Promise<Credentials> {
    let envClientId = env['PAN_CLIENT_ID']
    let envClientSecret = env['PAN_CLIENT_SECRET']
    let envRefreshToken = (opt && opt.refreshToken) || env['PAN_REFRESH_TOKEN']
    let envAccessToken = (opt && opt.accessToken) || env['PAN_ACCESS_TOKEN']
    let envEntryPoint = env['PAN_ENTRYPOINT']

    let entryPoint = APIEPMAP['americas']
    if (envEntryPoint) {
        entryPoint = envEntryPoint
    } else {
        commonLogger(logLevel.INFO, 'Environmental variable PAN_ENTRYPOINT not set. Assuming ' + entryPoint)
    }

    if (!(envAccessToken || (envClientId && envClientSecret && envRefreshToken))) {
        commonLogger(logLevel.INFO,
            'Neither "PAN_ACCESS_TOKEN" (for static credentials) nor "PAN_CLIENT_ID", "PAN_CLIENT_SECRET" and "PAN_REFRESH_TOKEN" for a memory-based credentials provider where provider. Will try with developer token credetials')
        let devTokCredentias: Credentials = DevTokenCredentials.factory({ entryPoint: entryPoint, ...opt })
        return devTokCredentias
    }

    if (envClientId && envClientSecret && envRefreshToken) {
        commonLogger(logLevel.INFO, 'Using memory based credentials provider')
        return SimpleCredentialsProvider.factory({
            clientId: envClientId,
            clientSecret: envClientSecret,
            refreshToken: envRefreshToken,
            entryPoint: entryPoint,
            ...opt
        })
    }

    if (envAccessToken) {
        commonLogger(logLevel.INFO, 'Using startic credentials. No refresh available.')
        return new StaticCredentials(envAccessToken, entryPoint)
    }

    throw new HubError('HubClient', 'Unknown error')
}
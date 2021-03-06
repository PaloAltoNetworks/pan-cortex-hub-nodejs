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

const EUFQDN = 'api.nl.cdl.paloaltonetworks.com'
const USFQDN = 'api.us.cdl.paloaltonetworks.com'
// const USFQDN = 'cortex-prd1-api.us.cdl.paloaltonetworks.com'

/**
 * Cortex constants
 */
export const cortexConstants = {
    /**
     * Map that links Cortex Data Lake regions with their corresponding FQDNs
     */
    APIEPMAP: {
        /**
         * entry point for europe
         */
        europe: EUFQDN,
        /**
         * entry point for americas
         */
        americas: USFQDN
    },
    /**
     * OAuth2 Identity Provider scopes for the Cortex Data Lake
     */
    OAUTH2SCOPEMAP: {
        ls_read: 'logging-service:read'
    },
    /**
     * Identity provider URL for authentication requests
     */
    IDP_TOKEN_URL: 'https://api.paloaltonetworks.com/api/oauth2/RequestToken',
    /**
     * Identity provider URL for token revoke operations
     */
    IDP_REVOKE_URL: 'https://api.paloaltonetworks.com/api/oauth2/RevokeToken',
    /**
     * Identity provider URL for token operations
     */
    IDP_AUTH_URL: 'https://identity.paloaltonetworks.com/as/authorization.oauth2',
    /**
     * URL of the Palo Alto Networks Developers Relations developer token service
     */
    DEV_TOKEN_PROVIDER: 'https://app.developers.paloaltonetworks.com/request_token'
}

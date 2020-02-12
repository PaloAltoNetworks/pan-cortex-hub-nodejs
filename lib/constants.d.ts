/**
 * Cortex constants
 */
export declare const cortexConstants: {
    /**
     * Map that links Cortex Data Lake regions with their corresponding FQDNs
     */
    APIEPMAP: {
        /**
         * entry point for europe
         */
        europe: string;
        /**
         * entry point for americas
         */
        americas: string;
    };
    /**
     * OAuth2 Identity Provider scopes for the Cortex Data Lake
     */
    OAUTH2SCOPEMAP: {
        ls_read: string;
    };
    /**
     * Identity provider URL for authentication requests
     */
    IDP_TOKEN_URL: string;
    /**
     * Identity provider URL for token revoke operations
     */
    IDP_REVOKE_URL: string;
    /**
     * Identity provider URL for token operations
     */
    IDP_AUTH_URL: string;
    /**
     * URL of the Palo Alto Networks Developers Relations developer token service
     */
    DEV_TOKEN_PROVIDER: string;
};

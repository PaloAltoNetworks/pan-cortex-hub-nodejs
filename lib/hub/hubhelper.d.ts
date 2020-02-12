/// <reference types="node" />
import { CortexCredentialProvider } from './credentials_provider';
import { Credentials } from './credentials';
import { URL } from 'url';
/**
 * Describes the `params` object provided by Cortex hub.
 * @typeparams T must extend a string dictionary and is expected to contain the
 * *custom fields* provided by the application in the manifest file
 */
export interface CortexClientParams<T extends {
    [key: string]: string;
}> {
    /**
     * Unique ID assigned by Cortex HUB to this application<->datalake combination
     */
    instance_id: string;
    /**
     * Convenient placeholder to allow applications using this SDK attach a friendly name to
     * the Instance ID
     */
    instance_name?: string;
    /**
     * Augmented `region` property provided by Cortex hub. Use the `paramsaParser` method to generate
     * this augmentation out of the BASE64 string provided by Cortex hub
     */
    location: {
        /**
         * Region value as provided by Cortex HUB
         */
        region: string;
        /**
         * Augmented API entry point for the provided region
         */
        entryPoint: string;
    };
    /**
     * Serial number of the Cortex Datalake at the other end of this Instance ID
     */
    lsn?: string;
    /**
     * Optional fields requested in the application manifest file
     */
    customFields?: T;
}
/**
 * Convenience type guard function to check if a given object conforms to the
 * `CortexClientParams` interface
 * @param obj the object to be checked
 * @returns true if the provided object conforms to the `CortexClientParams` interface
 */
export declare function isCortexClientParams<T extends {
    [key: string]: string;
}>(obj: any): obj is CortexClientParams<T>;
/**
 * Metadata attached by HubHelper into CredentialProviders store
 */
export interface HubMetadata<T extends {
    [key: string]: string;
}> {
    /**
     * Requester Tenant ID
     */
    tenantId: string;
    /**
     * Requested datalakeID
     */
    datalakeId: string;
    /**
     * State codes generated for this datalake (pre-authorization)
     */
    stateCode: {
        [state: string]: boolean;
    };
    /**
     * Decoded params as provided by Cortex Hub
     */
    clientParams: CortexClientParams<T>;
}
/**
 * Convenience type guard function to check if an object is a valid HubMetadata type
 * @param obj object to be checked
 */
export declare function isHubMetadata(obj: any): obj is HubMetadata<never>;
/**
 * Optional configuration attributes for the `CortexHubHelper` class
 */
export interface CortexHelperOptions {
    /**
     * URL of the IDP authorization entry point (defaults to `https://identity.paloaltonetworks.com/as/authorization.oauth2`)
     */
    idpAuthUrl?: string;
}
/**
 * Class with methods to help interfacing with the Cortex hub.
 * @typeparam T shape of the key value (custom developer fields) provided by
 * Cortex Hub
 */
export declare class CortexHubHelper<T extends {
    [key: string]: string;
}> {
    private clientId;
    private idpAuthUrl;
    protected credProvider: CortexCredentialProvider<HubMetadata<T>>;
    private idpCallbackUrl;
    /**
     * Constructor method
     * @param idpCallbackUrl One of the URI's provided in the `auth_redirect_uris` field of the manifest file
     * @param credProv a `CortexCredentialProvider` instance that will be used by the `authCallbackHandler` to
     * register new datalakes after activation
     * @param tenantKey the name of the string-like property in `U` that contains the requesting Tenant ID
     * @param ops class configuration options
     */
    constructor(idpCallbackUrl: string, credProv: CortexCredentialProvider<HubMetadata<T>>, ops?: CortexHelperOptions);
    private static map;
    private static unmap;
    private static stateIdEncode;
    private static stateIdDecode;
    /**
     * Prepares an IDP authorization request
     * @param tenantId Requesting Tenant ID (will be store in the authorization state)
     * @param datalakeId Datalake ID willing to activate (will be store in the authorization state)
     * @param scope OAUTH2 Data access Scope(s)
     * @returns a URI ready to be consumed (typically to be used for a client 302 redirect)
     */
    idpAuthRequest(tenantId: string, datalakeId: string, scope: string[]): Promise<URL>;
    /**
     * Completes the OAuth2 code grant flow and returns a valid Credentials
     * object for the just authorized datalake
     * @param code OAuth2 code value
     * @param stateId state value returned by the IDP service
     * @param tId tenant identifier
     * @returns a valid Credentials object for this authorized data lake
     */
    idpAuthCallback(code: string, stateId: string, tId: string): Promise<Credentials>;
    /**
     * Parses the CortexHub BASE64 params string into a CortexClientParams object
     * @param params Input string
     * @param tenantId the resulting client params will be registered in the CredentialsProvider store
     * @returns the parsed object
     */
    hubParamsRegister(params: string, tenantId: string): Promise<CortexClientParams<T>>;
    /**
     * Retrieves the list of datalakes registered under this tenant
     * @param tenantId requesting Tenant ID
     * @returns an array with two columns: data lake id and params reported by
     * the Cortex hub
     */
    listDatalake(tenantId: string): Promise<({
        id: string;
        doc: CortexClientParams<T>;
    })[]>;
    /**
     * Retrieve the list of data lake id's that has been successfully authorized
     * by the user
     * @param tenantId
     * @returns and array with all data lake id's owned by the provided tenant
     * identifier that contain secrets
     */
    listActiveDatalake(tenantId: string): Promise<string[]>;
    /**
     * Gets metadata of a given Datalake ID as a `CortexClientParams` object
     * @param tenantId requesting Tenant ID
     * @param datalakeId ID of the Datalake
     * @returns the reported Cortex hub params for this data lake
     */
    getDatalake(tenantId: string, datalakeId: string): Promise<CortexClientParams<T> | undefined>;
    /**
     * Deletes a datalake metadata record
     * @param tenantId requesting Tenant ID
     * @param datalakeId ID of the datalake
     */
    deleteDatalake(tenantId: string, datalakeId: string): Promise<void>;
    /**
     * Get a credentials object for this tenant data lake combination
     * @param tenantId tenant identifier
     * @param datalakeId data lake identifier
     * @returns a `Credentials` object valid for the provided identifiers
     */
    getCredentialsObject(tenantId: string, datalakeId: string): Promise<Credentials>;
}

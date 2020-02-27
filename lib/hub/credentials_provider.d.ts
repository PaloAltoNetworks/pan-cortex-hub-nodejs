import { Credentials } from './credentials';
/**
 * Represents an raw Cortex IDP credential set
 */
interface IdpResponse {
    /**
     * JWT access_token value
     */
    access_token: string;
    /**
     * Optional new refresh_token value
     */
    refresh_token?: string;
    /**
     * Expiration duration (in seconds)
     */
    expires_in: string;
}
/**
 * Cortex credential set with additional `validUntil` field
 */
export declare type AugmentedIdpResponse = IdpResponse & {
    /**
     * Unix TS (seconds) that mark this access_token expiration time
     */
    validUntil: number;
};
/**
 * Data Lake storage item
 */
export interface StoreItem<T> {
    /**
     * Optional metadata
     */
    metadata?: T;
    /**
     * OAuth2 secrets and related data
     */
    secrets?: CredentialsItem;
}
/**
 * SDK Representation of a Cortex credential set
 */
export interface CredentialsItem {
    /**
     * JWT access_token value
     */
    accessToken: string;
    /**
     * Unix timestamp (in seconds) that mark the expiration time for this access_token
     */
    validUntil: number;
    /**
     * Cortex API fqdn (region) in which this access_token is valid
     */
    entryPoint: string;
    /**
     * refresh_token value bound to this access_token
     */
    refreshToken: string;
    /**
     * data lake identifier (application instance id)
     */
    datalakeId: string;
}
/**
 * Conveniente type guard to check an object against the `CredentialsItem` interface
 * @param obj object to check
 */
export declare function isCredentialItem(obj: any): obj is CredentialsItem;
/**
 * Methods that deal with secret storage
 */
export interface SecretsStorage<T> {
    /**
     * Creates of updates a secrets object belonging to a specific data lake identifier
     * @param datalakeId the data lake unique identifier
     * @param item secrets object
     */
    upsertStoreItem(datalakeId: string, item: StoreItem<T>): Promise<void>;
    /**
     * Removes an object from the store
     * @param datalakeId the data lake unique identifier
     */
    deleteStoreItem(datalakeId: string): Promise<void>;
    /**
     * Returns a secrets object from the store.
     *
     * @param datalakeId the data lake unique identifier
     * @returns the secrets object or undefined if it doesn't exists
     */
    getStoreItem(datalakeId: string): Promise<StoreItem<T> | undefined>;
    /**
     * Loads secrets stored externaly into the in-memory store. Implementator
     * should compare the passed object with the external store contents and
     * update the former accordingly.
     *
     * @param store refrence to the current in-memory store
     */
    loadDb(store: {
        [dlid: string]: StoreItem<T>;
    }): Promise<void>;
}
/**
 * Configuration options for a `CortexCredentialProvider` class
 */
export interface CredentialProviderOptions {
    /**
     * IDP Token Operation Entry Point. Defaults to `https://api.paloaltonetworks.com/api/oauth2/RequestToken`
     */
    idpTokenUrl?: string;
    /**
     * IDP Token Revoke Entry Point. Defaults to `https://api.paloaltonetworks.com/api/oauth2/RevokeToken`
     */
    idpRevokeUrl?: string;
    /**
     * How soon to expiration before the access token is automatically refreshed. Defaults to `300` (5 minutes)
     */
    accTokenGuardTime?: number;
    /**
     * How many attempts to contact IDP before giving up. Defaults to `3`
     */
    retrierAttempts?: number;
    /**
     * How many milliseconds to wait between retry attempts. Defauls to `100` milliseconds
     */
    retrierDelay?: number;
}
/**
 * Abstract class to provide credentials for multiple datalakes. If you want to
 * extend this class then you must implement its storage-related methods. *`T`*
 * describes the type of the optional metadata that can be attached to any
 * datalake's record.
 * @typeparam T type of the metadata to attach to any data lake instance
*/
export declare abstract class CortexCredentialProvider<T> implements SecretsStorage<T> {
    private clientId;
    private clientSecret;
    private idpTokenUrl;
    private idpRevokeUrl;
    store: {
        [dlid: string]: StoreItem<T>;
    };
    private retrierAttempts?;
    private retrierDelay?;
    private accTokenGuardTime;
    private emitter;
    private errorTools;
    /**
     * Class constructor
     * @param ops constructor options. Mandatory fields being OAUTH2 `clientId` and `clientSecret`
     */
    protected constructor(ops: CredentialProviderOptions & {
        clientId: string;
        clientSecret: string;
    });
    /**
     * Exposes the OAuth2 application client_id
     * @returns this CredentialProvider class OAUTH2 `clientId`
     */
    getClientId(): string;
    /**
     * Exposes the internal store. It does not deep-copy the objects so take
     * extra care when modifying its content. Do not use this method unless you
     * know what you're doing
     * @param dlid store item identifier
     * @param value if provided then it will be used to update the internal store
     */
    storeItem(dlid: string): Promise<StoreItem<T> | undefined>;
    storeItem(dlid: string, value: StoreItem<T>): Promise<void>;
    storeItem(): Promise<StoreItem<T>[]>;
    private lazyInitStoreItem;
    private idpRefresh;
    private idpRevoke;
    /**
     * Implements the Cortex Datalake OAUTH2 refresh token operation
     */
    private refreshAccessToken;
    /**
     * Use to exchange an OAuth2 code for its corresponding secrets (OAuth2 code
     * grant flow)
     * @param code OAuth2 code value
     * @param idpCallbackUrl OAuth2 callback value
     * @returns The IDP response
     */
    private fetchToken;
    /**
     * Issues a new credentials object for a datalake you have static access to its `refreshToken`.
     * @param datalakeId ID for this datalake
     * @param entryPoint Cortex Datalake regional entry point
     * @param refreshToken OAUTH2 `refresh_token` value
     * @param prefetch You can provide the `access_token` and `valid_until` values if you also have
     * access to them to avoid the initial token refresh operation
     * @param metadata context data to be stored alongside the secrets
     * @returns a `Credentials` object for the new registered data lake
     */
    addWithRefreshToken(datalakeId: string, entryPoint: string, refreshToken: string, prefetch?: {
        accessToken: string;
        validUntil: number;
    }, metadata?: T): Promise<Credentials>;
    /**
     * Issues a new credentials object for a datalake you have static access to
     * its initial code.
     * @param datalakeId ID for this datalake
     * @param entryPoint Cortex Datalake regional entry point
     * @param oa2code OAUTH2 `code` and `idpCallbackUrl` value required to
     * complete the code grant flow
     * @param metadata context data to be stored alongside the secrets
     * @returns a `Credentials` object for the new registered data lake
     */
    addWithCode(datalakeId: string, entryPoint: string, oa2code: {
        code: string;
        idpCallbackUrl: string;
    }, metadata?: T): Promise<Credentials>;
    /**
     * Retrieves the Credentials object for a given datalake
     * @param datalakeId ID of the datalake the Credentials object should be bound to
     * @returns a `Credentials` object for the requested data lake
     */
    getCredentialsObject(datalakeId: string): Promise<Credentials>;
    /**
     * Revokes a previous authorized datalake (revokes its OAUTH2 `refresh_token`)
     * @param datalakeId ID of the datalake to be removed
     */
    revokeDatalake(datalakeId: string): Promise<void>;
    /**
     * Completely removes a datalake from the store (it revokes the refresh
     * token if already authorized)
     * @param datalakeId ID of the datalake to be removed
     */
    deleteDatalake(datalakeId: string): Promise<void>;
    /**
     * Main method used by a bound Credentials object. Returns the current `access_token` and its
     * expiration time. It auto-refreshes the `access_token` if needed based on the `accTokenGuardTime`
     * class configuration option
     * @param datalakeId ID of the datalake to obtain `access_token` from
     * @param force to force refresh operation even if current access token is in its validity zone
     * @returns details about the refresh operation
     */
    getAccessToken(datalakeId: string, force?: boolean): Promise<string | undefined>;
    private buildCredentialsObject;
    /**
     * Implementation dependant. Must create or update the corresponfing item in
     * the store
     * @param datalakeId datalake identificator
     * @param item element to be stored
     * @param metadata optional metadata (used by multitenant applications to attach tenant ID)
     */
    abstract upsertStoreItem(datalakeId: string, item: StoreItem<T>): Promise<void>;
    /**
     * Implementation dependant. Must delete an item from the store
     * @param datalakeId datalake identificator
     */
    abstract deleteStoreItem(datalakeId: string): Promise<void>;
    /**
     * Implementation dependant. Must return the store item
     * @param datalakeId datalake identificator
     * @returns the corresponding item from the store
     */
    abstract getStoreItem(datalakeId: string): Promise<StoreItem<T> | undefined>;
    /**
     * Implementation dependant. A way to trigger the external DB initial load must be provided.
     * The subclass implementation should compare the protected object `store`
     * with the external data and update it if needed.
     * @param store refrence to the current in-memory store
     */
    abstract loadDb(store: {
        [dlid: string]: StoreItem<T>;
    }): Promise<void>;
}
/**
 * Buils a CortexCredentialsObject from provided options and storage object
 *
 * @param ops configuration options
 * @param storage object implementing the secrets storage interface
 * @returns an instantiated CortexCredentialsProvider object
 */
export declare function cortexCredentialsProviderFactory<T>(ops: CredentialProviderOptions & {
    clientId: string;
    clientSecret: string;
}, storage: SecretsStorage<T>): CortexCredentialProvider<T>;
export {};

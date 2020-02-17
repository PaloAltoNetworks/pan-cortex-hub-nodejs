import { CredentialsBase } from './credentials';
/**
 * Expected shape of the object returned by the Credentials Provider
 */
export interface DevTokenSrvResponse {
    /**
     * access token value
     */
    access_token: string;
}
/**
 * Options to customize a DevTokenCredentials subclass
 */
export interface DevTokenCredentialsOptions {
    /**
     * URI for the developer token provider
     */
    developerTokenProvider?: string;
    /**
     * Developer Token string
     */
    developerToken?: string;
    /**
     * Cortex API fqdn to use (region)
     */
    entryPoint?: string;
    /**
     * Amount of seconds ahead of access_token expiration in which a refresh
     * operation should be attempted
     */
    guardTime?: number;
}
/**
 * Implements the Credentials abstract class with the Developer Token mechanism.
 * Use its static `factory` method to instantiate an object of this class.
 */
export declare class DevTokenCredentials extends CredentialsBase {
    private developerToken;
    private developerTokenProvider;
    private guardTime;
    private accessToken;
    private validUntil;
    private emitter;
    private errorTools;
    private constructor();
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
    static factory(ops?: DevTokenCredentialsOptions): DevTokenCredentials;
    private devTokenConsume;
    /**
     * Returns the access token or undefined if no refresh operation has been executed
     * @param force return the access token even if it has not been refreshed
     * @returns the access token if refreshed or `force` equals `true`
     */
    getToken(force?: boolean): Promise<string | undefined>;
}

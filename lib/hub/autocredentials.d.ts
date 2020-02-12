import { CredentialProviderOptions } from './credentials_provider';
import { DevTokenCredentialsOptions } from './credentials_devtoken';
import { Credentials } from './credentials';
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
export declare function autoCredentials(opt?: CredentialProviderOptions & DevTokenCredentialsOptions & {
    accessToken?: string;
    refreshToken?: string;
    entryPoint?: string;
}): Promise<Credentials>;

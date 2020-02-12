import { CortexCredentialProvider, CredentialProviderOptions, StoreItem } from './credentials_provider';
import { Credentials } from './credentials';
/**
 * Memory-only implementation of the abstract class `CortexCredentialProvider`
 * to be used for quick starting Cortex API experiments with just one active
 * data lake. You only need to provide the OAuth2 application secret (client_id
 * and client_secret) as well as the refresh token value for the single data
 * lake to experiment with.
 *
 * Use the static method `factory` to instantiate an object of this class.
 */
export declare class SimpleCredentialsProvider extends CortexCredentialProvider<never> {
    private constructor();
    /**
     * Instantiates a *memory-only* CredentialProvider subclass with only one data lake manually
     * registered. Obtains all configuration values either from provided configuration options or
     * from environmental variables.
     * @param ops.clientId OAUTH2 `client_id` value. If not provided will attempt to get it from the
     * `PAN_CLIENT_ID` environmental variable
     * @param ops.clientSecret OAUTH2 `client_secret` value. If not provided will attempt to get it
     * from the `PAN_CLIENT_SECRET` environmental variable
     * @param ops.refreshToken OAUTH2 `refresh_token` value. If not provided will attempt to get it
     * from the `PAN_REFRESH_TOKEN` environmental variable
     * @param ops.entryPoint Cortex Datalake regiona API entrypoint. If not provided will attempt
     * to get it from the `PAN_ENTRYPOINT` environmental variable
     * @param ops.datalakeId Datalake Indentifier. Defaults to 'DEFAULT'
     * @returns a Credentials object bound to the provided `refresh_token`
     */
    static factory(ops?: CredentialProviderOptions & {
        clientId?: string;
        clientSecret?: string;
        refreshToken?: string;
        entryPoint?: string;
        datalakeId?: string;
    }): Promise<Credentials>;
    protected upsertStoreItem(datalakeId: string, item: StoreItem<never>): Promise<void>;
    protected deleteStoreItem(datalakeId: string): Promise<void>;
    protected getStoreItem(datalakeId: string): Promise<StoreItem<never>>;
    loadDb(): Promise<void>;
}

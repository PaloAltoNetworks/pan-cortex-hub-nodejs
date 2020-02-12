import { CortexHubHelper, CortexHelperOptions, HubMetadata } from './hubhelper';
import { CortexCredentialProvider, CredentialsItem, CredentialProviderOptions, StoreItem } from './credentials_provider';
declare class CredentialsDebugger extends CortexCredentialProvider<HubMetadata<never>> {
    credItemsStore: {
        [dlId: string]: CredentialsItem;
    };
    credMetadataStore: {
        [dlId: string]: undefined | HubMetadata<never>;
    };
    private constructor();
    static factory(ops?: CredentialProviderOptions & {
        clientId?: string;
        clientSecret?: string;
    }): CredentialsDebugger;
    protected upsertStoreItem(datalakeId: string, item: StoreItem<HubMetadata<never>>): Promise<void>;
    protected deleteStoreItem(datalakeId: string): Promise<void>;
    protected getStoreItem(datalakeId: string): Promise<StoreItem<HubMetadata<never>> | undefined>;
    loadDb(): Promise<void>;
}
/**
 * Convenience `CortexHubHelper` subclass for quick starting experiments with
 * Cortex hub. Use its static method `factory` to instantiate an object for this
 * class
 */
export declare class HubDebugger extends CortexHubHelper<never> {
    credDebugger: CredentialsDebugger;
    private constructor();
    /**
     * Convenience method to instantiate `HubDebugger` objects
     * @param idpCallbackUrl its must be equal to one of the entries in the
     * `auth_redirect_uris` array in the manifest file provided to publish the
     * application in the Cortex hub
     * @param ops configuration options for its parent classes
     * @returns an instantiated `HubDebugger` object
     */
    static factory(idpCallbackUrl: string, ops?: CredentialProviderOptions & CortexHelperOptions & {
        clientId?: string;
        clientSecret?: string;
    }): HubDebugger;
    /**
     * Dumps the internal CredentialsProvider store as a JSON document
     */
    dumpDatabase(): Promise<string>;
}
export {};

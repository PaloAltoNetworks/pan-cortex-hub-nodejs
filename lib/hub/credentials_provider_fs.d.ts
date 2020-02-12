import { CortexCredentialProvider, CredentialProviderOptions, StoreItem } from './credentials_provider';
/**
 * Implements the CortexCredentialProvider abstract class using a local file as
 * secret vault. Use the static method `factory` to instantiate and object of this class.
 * @typeparam T type of the metadata to attach to any data lake instance
 */
export declare class FsCredProvider<T> extends CortexCredentialProvider<T> {
    private key;
    private iv;
    private configFileName;
    private constructor();
    /**
     * Initializes a `CortexCredentialProvider` subclass that leverages the local filesystem as storage.
     * State data will be stored in the file `PANCLOUD_CONFIG.json` option
     * `configFile` is not provided.
     * Gets all its configuration options either from optional properties of from environmental variables.
     * Important properties in the `ops` object are:
     * @param secret encryption key that will be used to store sensible data at
     * rest. If not provided it will try to get this mandatory value from the
     * environmental variable PAN_SECRET
     * @param configFile file name that will be used to store the secrets
     * @typeparam T type of the metadata to attach to any data lake instance
     * @returns an initializated `FsCredProvider` object
     */
    static factory<T>(ops?: FsCredProviderOptions): Promise<FsCredProvider<T>>;
    private fullSync;
    /**
     * Loads the data in the file
     */
    loadDb(): Promise<void>;
    protected upsertStoreItem(datalakeId: string, item: StoreItem<T>): Promise<void>;
    protected deleteStoreItem(datalakeId: string): Promise<void>;
    protected getStoreItem(datalakeId: string): Promise<StoreItem<T>>;
}
/**
 * Options for the FS Credentials Provider factory
 */
export interface FsCredProviderOptions extends CredentialProviderOptions {
    /** secret that will be used to cipher / decipher secrets. You better
     * provide it from environmental variables for customer data privacy */
    secret?: string;
    /** file that will contain the database. Will be created empty if does not exist */
    configFile?: string;
}

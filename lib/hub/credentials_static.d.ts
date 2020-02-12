import { CredentialsBase } from './credentials';
/**
 * A Credentials implementation that just wraps a explicitly provided
 * access_token. Any refresh call will fail so it will last as long as the
 * provided access_token expiration date. Use the static method `factory` to
 * instantiate an object of this class
 */
export declare class StaticCredentials extends CredentialsBase {
    private token;
    constructor(token: string, entryPoint: string);
    getToken(force?: boolean): Promise<string | undefined>;
}

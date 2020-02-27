[@paloaltonetworks/pan-cortex-hub](../README.md) › [FsCredProviderOptions](fscredprovideroptions.md)

# Interface: FsCredProviderOptions

Options for the FS Credentials Provider factory

## Hierarchy

* [CredentialProviderOptions](credentialprovideroptions.md)

  ↳ **FsCredProviderOptions**

## Index

### Properties

* [accTokenGuardTime](fscredprovideroptions.md#optional-acctokenguardtime)
* [configFile](fscredprovideroptions.md#optional-configfile)
* [idpRevokeUrl](fscredprovideroptions.md#optional-idprevokeurl)
* [idpTokenUrl](fscredprovideroptions.md#optional-idptokenurl)
* [retrierAttempts](fscredprovideroptions.md#optional-retrierattempts)
* [retrierDelay](fscredprovideroptions.md#optional-retrierdelay)
* [secret](fscredprovideroptions.md#optional-secret)

## Properties

### `Optional` accTokenGuardTime

• **accTokenGuardTime**? : *undefined | number*

*Inherited from [CredentialProviderOptions](credentialprovideroptions.md).[accTokenGuardTime](credentialprovideroptions.md#optional-acctokenguardtime)*

*Defined in [src/hub/credentials_provider.ts:180](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L180)*

How soon to expiration before the access token is automatically refreshed. Defaults to `300` (5 minutes)

___

### `Optional` configFile

• **configFile**? : *undefined | string*

*Defined in [src/hub/credentials_provider_fs.ts:186](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider_fs.ts#L186)*

file that will contain the database. Will be created empty if does not exist

___

### `Optional` idpRevokeUrl

• **idpRevokeUrl**? : *undefined | string*

*Inherited from [CredentialProviderOptions](credentialprovideroptions.md).[idpRevokeUrl](credentialprovideroptions.md#optional-idprevokeurl)*

*Defined in [src/hub/credentials_provider.ts:176](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L176)*

IDP Token Revoke Entry Point. Defaults to `https://api.paloaltonetworks.com/api/oauth2/RevokeToken`

___

### `Optional` idpTokenUrl

• **idpTokenUrl**? : *undefined | string*

*Inherited from [CredentialProviderOptions](credentialprovideroptions.md).[idpTokenUrl](credentialprovideroptions.md#optional-idptokenurl)*

*Defined in [src/hub/credentials_provider.ts:172](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L172)*

IDP Token Operation Entry Point. Defaults to `https://api.paloaltonetworks.com/api/oauth2/RequestToken`

___

### `Optional` retrierAttempts

• **retrierAttempts**? : *undefined | number*

*Inherited from [CredentialProviderOptions](credentialprovideroptions.md).[retrierAttempts](credentialprovideroptions.md#optional-retrierattempts)*

*Defined in [src/hub/credentials_provider.ts:184](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L184)*

How many attempts to contact IDP before giving up. Defaults to `3`

___

### `Optional` retrierDelay

• **retrierDelay**? : *undefined | number*

*Inherited from [CredentialProviderOptions](credentialprovideroptions.md).[retrierDelay](credentialprovideroptions.md#optional-retrierdelay)*

*Defined in [src/hub/credentials_provider.ts:188](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L188)*

How many milliseconds to wait between retry attempts. Defauls to `100` milliseconds

___

### `Optional` secret

• **secret**? : *undefined | string*

*Defined in [src/hub/credentials_provider_fs.ts:184](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider_fs.ts#L184)*

secret that will be used to cipher / decipher secrets. You better
provide it from environmental variables for customer data privacy

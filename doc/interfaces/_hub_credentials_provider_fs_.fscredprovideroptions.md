[pan-cortex-hub](../README.md) › ["hub/credentials_provider_fs"](../modules/_hub_credentials_provider_fs_.md) › [FsCredProviderOptions](_hub_credentials_provider_fs_.fscredprovideroptions.md)

# Interface: FsCredProviderOptions

Options for the FS Credentials Provider factory

## Hierarchy

* [CredentialProviderOptions](_hub_credentials_provider_.credentialprovideroptions.md)

  ↳ **FsCredProviderOptions**

## Index

### Properties

* [accTokenGuardTime](_hub_credentials_provider_fs_.fscredprovideroptions.md#optional-acctokenguardtime)
* [configFile](_hub_credentials_provider_fs_.fscredprovideroptions.md#optional-configfile)
* [idpRevokeUrl](_hub_credentials_provider_fs_.fscredprovideroptions.md#optional-idprevokeurl)
* [idpTokenUrl](_hub_credentials_provider_fs_.fscredprovideroptions.md#optional-idptokenurl)
* [retrierAttempts](_hub_credentials_provider_fs_.fscredprovideroptions.md#optional-retrierattempts)
* [retrierDelay](_hub_credentials_provider_fs_.fscredprovideroptions.md#optional-retrierdelay)
* [secret](_hub_credentials_provider_fs_.fscredprovideroptions.md#optional-secret)

## Properties

### `Optional` accTokenGuardTime

• **accTokenGuardTime**? : *undefined | number*

*Inherited from [CredentialProviderOptions](_hub_credentials_provider_.credentialprovideroptions.md).[accTokenGuardTime](_hub_credentials_provider_.credentialprovideroptions.md#optional-acctokenguardtime)*

Defined in src/hub/credentials_provider.ts:144

How soon to expiration before the access token is automatically refreshed. Defaults to `300` (5 minutes)

___

### `Optional` configFile

• **configFile**? : *undefined | string*

Defined in src/hub/credentials_provider_fs.ts:186

file that will contain the database. Will be created empty if does not exist

___

### `Optional` idpRevokeUrl

• **idpRevokeUrl**? : *undefined | string*

*Inherited from [CredentialProviderOptions](_hub_credentials_provider_.credentialprovideroptions.md).[idpRevokeUrl](_hub_credentials_provider_.credentialprovideroptions.md#optional-idprevokeurl)*

Defined in src/hub/credentials_provider.ts:140

IDP Token Revoke Entry Point. Defaults to `https://api.paloaltonetworks.com/api/oauth2/RevokeToken`

___

### `Optional` idpTokenUrl

• **idpTokenUrl**? : *undefined | string*

*Inherited from [CredentialProviderOptions](_hub_credentials_provider_.credentialprovideroptions.md).[idpTokenUrl](_hub_credentials_provider_.credentialprovideroptions.md#optional-idptokenurl)*

Defined in src/hub/credentials_provider.ts:136

IDP Token Operation Entry Point. Defaults to `https://api.paloaltonetworks.com/api/oauth2/RequestToken`

___

### `Optional` retrierAttempts

• **retrierAttempts**? : *undefined | number*

*Inherited from [CredentialProviderOptions](_hub_credentials_provider_.credentialprovideroptions.md).[retrierAttempts](_hub_credentials_provider_.credentialprovideroptions.md#optional-retrierattempts)*

Defined in src/hub/credentials_provider.ts:148

How many attempts to contact IDP before giving up. Defaults to `3`

___

### `Optional` retrierDelay

• **retrierDelay**? : *undefined | number*

*Inherited from [CredentialProviderOptions](_hub_credentials_provider_.credentialprovideroptions.md).[retrierDelay](_hub_credentials_provider_.credentialprovideroptions.md#optional-retrierdelay)*

Defined in src/hub/credentials_provider.ts:152

How many milliseconds to wait between retry attempts. Defauls to `100` milliseconds

___

### `Optional` secret

• **secret**? : *undefined | string*

Defined in src/hub/credentials_provider_fs.ts:184

secret that will be used to cipher / decipher secrets. You better
provide it from environmental variables for customer data privacy

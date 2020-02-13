[pan-cortex-hub](../README.md) › ["hub/credentials_provider"](../modules/_hub_credentials_provider_.md) › [CredentialProviderOptions](_hub_credentials_provider_.credentialprovideroptions.md)

# Interface: CredentialProviderOptions

Configuration options for a `CortexCredentialProvider` class

## Hierarchy

* **CredentialProviderOptions**

  ↳ [FsCredProviderOptions](_hub_credentials_provider_fs_.fscredprovideroptions.md)

## Index

### Properties

* [accTokenGuardTime](_hub_credentials_provider_.credentialprovideroptions.md#optional-acctokenguardtime)
* [idpRevokeUrl](_hub_credentials_provider_.credentialprovideroptions.md#optional-idprevokeurl)
* [idpTokenUrl](_hub_credentials_provider_.credentialprovideroptions.md#optional-idptokenurl)
* [retrierAttempts](_hub_credentials_provider_.credentialprovideroptions.md#optional-retrierattempts)
* [retrierDelay](_hub_credentials_provider_.credentialprovideroptions.md#optional-retrierdelay)

## Properties

### `Optional` accTokenGuardTime

• **accTokenGuardTime**? : *undefined | number*

Defined in src/hub/credentials_provider.ts:144

How soon to expiration before the access token is automatically refreshed. Defaults to `300` (5 minutes)

___

### `Optional` idpRevokeUrl

• **idpRevokeUrl**? : *undefined | string*

Defined in src/hub/credentials_provider.ts:140

IDP Token Revoke Entry Point. Defaults to `https://api.paloaltonetworks.com/api/oauth2/RevokeToken`

___

### `Optional` idpTokenUrl

• **idpTokenUrl**? : *undefined | string*

Defined in src/hub/credentials_provider.ts:136

IDP Token Operation Entry Point. Defaults to `https://api.paloaltonetworks.com/api/oauth2/RequestToken`

___

### `Optional` retrierAttempts

• **retrierAttempts**? : *undefined | number*

Defined in src/hub/credentials_provider.ts:148

How many attempts to contact IDP before giving up. Defaults to `3`

___

### `Optional` retrierDelay

• **retrierDelay**? : *undefined | number*

Defined in src/hub/credentials_provider.ts:152

How many milliseconds to wait between retry attempts. Defauls to `100` milliseconds

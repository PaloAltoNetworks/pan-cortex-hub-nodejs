[@paloaltonetworks/pan-cortex-hub](../README.md) › [CredentialProviderOptions](credentialprovideroptions.md)

# Interface: CredentialProviderOptions

Configuration options for a `CortexCredentialProvider` class

## Hierarchy

* **CredentialProviderOptions**

  ↳ [FsCredProviderOptions](fscredprovideroptions.md)

## Index

### Properties

* [accTokenGuardTime](credentialprovideroptions.md#optional-acctokenguardtime)
* [idpRevokeUrl](credentialprovideroptions.md#optional-idprevokeurl)
* [idpTokenUrl](credentialprovideroptions.md#optional-idptokenurl)
* [retrierAttempts](credentialprovideroptions.md#optional-retrierattempts)
* [retrierDelay](credentialprovideroptions.md#optional-retrierdelay)

## Properties

### `Optional` accTokenGuardTime

• **accTokenGuardTime**? : *undefined | number*

*Defined in [src/hub/credentials_provider.ts:145](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L145)*

How soon to expiration before the access token is automatically refreshed. Defaults to `300` (5 minutes)

___

### `Optional` idpRevokeUrl

• **idpRevokeUrl**? : *undefined | string*

*Defined in [src/hub/credentials_provider.ts:141](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L141)*

IDP Token Revoke Entry Point. Defaults to `https://api.paloaltonetworks.com/api/oauth2/RevokeToken`

___

### `Optional` idpTokenUrl

• **idpTokenUrl**? : *undefined | string*

*Defined in [src/hub/credentials_provider.ts:137](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L137)*

IDP Token Operation Entry Point. Defaults to `https://api.paloaltonetworks.com/api/oauth2/RequestToken`

___

### `Optional` retrierAttempts

• **retrierAttempts**? : *undefined | number*

*Defined in [src/hub/credentials_provider.ts:149](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L149)*

How many attempts to contact IDP before giving up. Defaults to `3`

___

### `Optional` retrierDelay

• **retrierDelay**? : *undefined | number*

*Defined in [src/hub/credentials_provider.ts:153](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L153)*

How many milliseconds to wait between retry attempts. Defauls to `100` milliseconds

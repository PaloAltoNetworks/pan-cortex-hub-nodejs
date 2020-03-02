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

*Defined in [src/hub/credentials_provider.ts:180](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L180)*

How soon to expiration before the access token is automatically refreshed. Defaults to `300` (5 minutes)

___

### `Optional` idpRevokeUrl

• **idpRevokeUrl**? : *undefined | string*

*Defined in [src/hub/credentials_provider.ts:176](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L176)*

IDP Token Revoke Entry Point. Defaults to `https://api.paloaltonetworks.com/api/oauth2/RevokeToken`

___

### `Optional` idpTokenUrl

• **idpTokenUrl**? : *undefined | string*

*Defined in [src/hub/credentials_provider.ts:172](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L172)*

IDP Token Operation Entry Point. Defaults to `https://api.paloaltonetworks.com/api/oauth2/RequestToken`

___

### `Optional` retrierAttempts

• **retrierAttempts**? : *undefined | number*

*Defined in [src/hub/credentials_provider.ts:184](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L184)*

How many attempts to contact IDP before giving up. Defaults to `3`

___

### `Optional` retrierDelay

• **retrierDelay**? : *undefined | number*

*Defined in [src/hub/credentials_provider.ts:188](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L188)*

How many milliseconds to wait between retry attempts. Defauls to `100` milliseconds

[@paloaltonetworks/pan-cortex-hub](../README.md) › [IdpResponse](idpresponse.md)

# Interface: IdpResponse

Represents an raw Cortex IDP credential set

## Hierarchy

* **IdpResponse**

## Index

### Properties

* [access_token](idpresponse.md#access_token)
* [expires_in](idpresponse.md#expires_in)
* [refresh_token](idpresponse.md#optional-refresh_token)

## Properties

###  access_token

• **access_token**: *string*

*Defined in [src/hub/credentials_provider.ts:31](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L31)*

JWT access_token value

___

###  expires_in

• **expires_in**: *string*

*Defined in [src/hub/credentials_provider.ts:39](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L39)*

Expiration duration (in seconds)

___

### `Optional` refresh_token

• **refresh_token**? : *undefined | string*

*Defined in [src/hub/credentials_provider.ts:35](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L35)*

Optional new refresh_token value

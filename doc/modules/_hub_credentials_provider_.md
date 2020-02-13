[pan-cortex-hub](../README.md) › ["hub/credentials_provider"](_hub_credentials_provider_.md)

# External module: "hub/credentials_provider"

## Index

### Classes

* [CortexCredentialProvider](../classes/_hub_credentials_provider_.cortexcredentialprovider.md)

### Interfaces

* [CredentialProviderOptions](../interfaces/_hub_credentials_provider_.credentialprovideroptions.md)
* [CredentialsItem](../interfaces/_hub_credentials_provider_.credentialsitem.md)
* [StoreItem](../interfaces/_hub_credentials_provider_.storeitem.md)

### Type aliases

* [AugmentedIdpResponse](_hub_credentials_provider_.md#augmentedidpresponse)

### Functions

* [isCredentialItem](_hub_credentials_provider_.md#iscredentialitem)

## Type aliases

###  AugmentedIdpResponse

Ƭ **AugmentedIdpResponse**: *IdpResponse & object*

Defined in src/hub/credentials_provider.ts:44

Cortex credential set with additional `validUntil` field

## Functions

###  isCredentialItem

▸ **isCredentialItem**(`obj`: any): *obj is CredentialsItem*

Defined in src/hub/credentials_provider.ts:117

Conveniente type guard to check an object against the `CredentialsItem` interface

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`obj` | any | object to check  |

**Returns:** *obj is CredentialsItem*

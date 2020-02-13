[pan-cortex-hub](../README.md) › ["hub/credentials_provider_simple"](../modules/_hub_credentials_provider_simple_.md) › [SimpleCredentialsProvider](_hub_credentials_provider_simple_.simplecredentialsprovider.md)

# Class: SimpleCredentialsProvider

Memory-only implementation of the abstract class `CortexCredentialProvider`
to be used for quick starting Cortex API experiments with just one active
data lake. You only need to provide the OAuth2 application secret (client_id
and client_secret) as well as the refresh token value for the single data
lake to experiment with.

Use the static method `factory` to instantiate an object of this class.

## Hierarchy

* [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md)‹never›

  ↳ **SimpleCredentialsProvider**

## Index

### Constructors

* [constructor](_hub_credentials_provider_simple_.simplecredentialsprovider.md#protected-constructor)

### Properties

* [store](_hub_credentials_provider_simple_.simplecredentialsprovider.md#protected-store)

### Methods

* [addWithCode](_hub_credentials_provider_simple_.simplecredentialsprovider.md#addwithcode)
* [addWithRefreshToken](_hub_credentials_provider_simple_.simplecredentialsprovider.md#addwithrefreshtoken)
* [deleteDatalake](_hub_credentials_provider_simple_.simplecredentialsprovider.md#deletedatalake)
* [deleteStoreItem](_hub_credentials_provider_simple_.simplecredentialsprovider.md#protected-deletestoreitem)
* [getAccessToken](_hub_credentials_provider_simple_.simplecredentialsprovider.md#getaccesstoken)
* [getClientId](_hub_credentials_provider_simple_.simplecredentialsprovider.md#getclientid)
* [getCredentialsObject](_hub_credentials_provider_simple_.simplecredentialsprovider.md#getcredentialsobject)
* [getStoreItem](_hub_credentials_provider_simple_.simplecredentialsprovider.md#protected-getstoreitem)
* [loadDb](_hub_credentials_provider_simple_.simplecredentialsprovider.md#loaddb)
* [revokeDatalake](_hub_credentials_provider_simple_.simplecredentialsprovider.md#revokedatalake)
* [storeItem](_hub_credentials_provider_simple_.simplecredentialsprovider.md#storeitem)
* [upsertStoreItem](_hub_credentials_provider_simple_.simplecredentialsprovider.md#protected-upsertstoreitem)
* [factory](_hub_credentials_provider_simple_.simplecredentialsprovider.md#static-factory)

## Constructors

### `Protected` constructor

\+ **new SimpleCredentialsProvider**(`ops`: [CredentialProviderOptions](../interfaces/_hub_credentials_provider_.credentialprovideroptions.md) & object): *[SimpleCredentialsProvider](_hub_credentials_provider_simple_.simplecredentialsprovider.md)*

*Inherited from [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[constructor](_hub_credentials_provider_.cortexcredentialprovider.md#protected-constructor)*

Defined in src/hub/credentials_provider.ts:172

Class constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ops` | [CredentialProviderOptions](../interfaces/_hub_credentials_provider_.credentialprovideroptions.md) & object | constructor options. Mandatory fields being OAUTH2 `clientId` and `clientSecret`  |

**Returns:** *[SimpleCredentialsProvider](_hub_credentials_provider_simple_.simplecredentialsprovider.md)*

## Properties

### `Protected` store

• **store**: *object*

*Inherited from [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[store](_hub_credentials_provider_.cortexcredentialprovider.md#protected-store)*

Defined in src/hub/credentials_provider.ts:168

#### Type declaration:

* \[ **dlid**: *string*\]: [StoreItem](../interfaces/_hub_credentials_provider_.storeitem.md)‹never›

## Methods

###  addWithCode

▸ **addWithCode**(`datalakeId`: string, `entryPoint`: string, `oa2code`: object, `metadata?`: T): *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

*Inherited from [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[addWithCode](_hub_credentials_provider_.cortexcredentialprovider.md#addwithcode)*

Defined in src/hub/credentials_provider.ts:368

Issues a new credentials object for a datalake you have static access to
its initial code.

**Parameters:**

▪ **datalakeId**: *string*

ID for this datalake

▪ **entryPoint**: *string*

Cortex Datalake regional entry point

▪ **oa2code**: *object*

OAUTH2 `code` and `idpCallbackUrl` value required to
complete the code grant flow

Name | Type |
------ | ------ |
`code` | string |
`idpCallbackUrl` | string |

▪`Optional`  **metadata**: *T*

context data to be stored alongside the secrets

**Returns:** *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

a `Credentials` object for the new registered data lake

___

###  addWithRefreshToken

▸ **addWithRefreshToken**(`datalakeId`: string, `entryPoint`: string, `refreshToken`: string, `prefetch?`: undefined | object, `metadata?`: T): *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

*Inherited from [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[addWithRefreshToken](_hub_credentials_provider_.cortexcredentialprovider.md#addwithrefreshtoken)*

Defined in src/hub/credentials_provider.ts:326

Issues a new credentials object for a datalake you have static access to its `refreshToken`.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | ID for this datalake |
`entryPoint` | string | Cortex Datalake regional entry point |
`refreshToken` | string | OAUTH2 `refresh_token` value |
`prefetch?` | undefined &#124; object | You can provide the `access_token` and `valid_until` values if you also have access to them to avoid the initial token refresh operation |
`metadata?` | T | context data to be stored alongside the secrets |

**Returns:** *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

a `Credentials` object for the new registered data lake

___

###  deleteDatalake

▸ **deleteDatalake**(`datalakeId`: string): *Promise‹void›*

*Inherited from [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[deleteDatalake](_hub_credentials_provider_.cortexcredentialprovider.md#deletedatalake)*

Defined in src/hub/credentials_provider.ts:461

Completely removes a datalake from the store (it revokes the refresh
token if already authorized)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | ID of the datalake to be removed  |

**Returns:** *Promise‹void›*

___

### `Protected` deleteStoreItem

▸ **deleteStoreItem**(`datalakeId`: string): *Promise‹void›*

*Overrides [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[deleteStoreItem](_hub_credentials_provider_.cortexcredentialprovider.md#protected-abstract-deletestoreitem)*

Defined in src/hub/credentials_provider_simple.ts:94

**Parameters:**

Name | Type |
------ | ------ |
`datalakeId` | string |

**Returns:** *Promise‹void›*

___

###  getAccessToken

▸ **getAccessToken**(`datalakeId`: string, `force`: boolean): *Promise‹string | undefined›*

*Inherited from [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[getAccessToken](_hub_credentials_provider_.cortexcredentialprovider.md#getaccesstoken)*

Defined in src/hub/credentials_provider.ts:476

Main method used by a bound Credentials object. Returns the current `access_token` and its
expiration time. It auto-refreshes the `access_token` if needed based on the `accTokenGuardTime`
class configuration option

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`datalakeId` | string | - | ID of the datalake to obtain `access_token` from |
`force` | boolean | false | to force refresh operation even if current access token is in its validity zone |

**Returns:** *Promise‹string | undefined›*

details about the refresh operation

___

###  getClientId

▸ **getClientId**(): *string*

*Inherited from [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[getClientId](_hub_credentials_provider_.cortexcredentialprovider.md#getclientid)*

Defined in src/hub/credentials_provider.ts:199

Exposes the OAuth2 application client_id

**Returns:** *string*

this CredentialProvider class OAUTH2 `clientId`

___

###  getCredentialsObject

▸ **getCredentialsObject**(`datalakeId`: string): *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

*Inherited from [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[getCredentialsObject](_hub_credentials_provider_.cortexcredentialprovider.md#getcredentialsobject)*

Defined in src/hub/credentials_provider.ts:401

Retrieves the Credentials object for a given datalake

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | ID of the datalake the Credentials object should be bound to |

**Returns:** *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

a `Credentials` object for the requested data lake

___

### `Protected` getStoreItem

▸ **getStoreItem**(`datalakeId`: string): *Promise‹[StoreItem](../interfaces/_hub_credentials_provider_.storeitem.md)‹never››*

*Overrides [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[getStoreItem](_hub_credentials_provider_.cortexcredentialprovider.md#protected-abstract-getstoreitem)*

Defined in src/hub/credentials_provider_simple.ts:97

**Parameters:**

Name | Type |
------ | ------ |
`datalakeId` | string |

**Returns:** *Promise‹[StoreItem](../interfaces/_hub_credentials_provider_.storeitem.md)‹never››*

___

###  loadDb

▸ **loadDb**(): *Promise‹void›*

*Overrides [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[loadDb](_hub_credentials_provider_.cortexcredentialprovider.md#abstract-loaddb)*

Defined in src/hub/credentials_provider_simple.ts:101

**Returns:** *Promise‹void›*

___

###  revokeDatalake

▸ **revokeDatalake**(`datalakeId`: string): *Promise‹void›*

*Inherited from [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[revokeDatalake](_hub_credentials_provider_.cortexcredentialprovider.md#revokedatalake)*

Defined in src/hub/credentials_provider.ts:421

Revokes a previous authorized datalake (revokes its OAUTH2 `refresh_token`)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | ID of the datalake to be removed  |

**Returns:** *Promise‹void›*

___

###  storeItem

▸ **storeItem**(`dlid`: string): *Promise‹[StoreItem](../interfaces/_hub_credentials_provider_.storeitem.md)‹never› | undefined›*

*Inherited from [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[storeItem](_hub_credentials_provider_.cortexcredentialprovider.md#storeitem)*

Defined in src/hub/credentials_provider.ts:210

Exposes the internal store. It does not deep-copy the objects so take
extra care when modifying its content. Do not use this method unless you
know what you're doing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dlid` | string | store item identifier |

**Returns:** *Promise‹[StoreItem](../interfaces/_hub_credentials_provider_.storeitem.md)‹never› | undefined›*

▸ **storeItem**(`dlid`: string, `value`: [StoreItem](../interfaces/_hub_credentials_provider_.storeitem.md)‹never›): *Promise‹void›*

*Inherited from [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[storeItem](_hub_credentials_provider_.cortexcredentialprovider.md#storeitem)*

Defined in src/hub/credentials_provider.ts:211

**Parameters:**

Name | Type |
------ | ------ |
`dlid` | string |
`value` | [StoreItem](../interfaces/_hub_credentials_provider_.storeitem.md)‹never› |

**Returns:** *Promise‹void›*

▸ **storeItem**(): *Promise‹[StoreItem](../interfaces/_hub_credentials_provider_.storeitem.md)‹never›[]›*

*Inherited from [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[storeItem](_hub_credentials_provider_.cortexcredentialprovider.md#storeitem)*

Defined in src/hub/credentials_provider.ts:212

**Returns:** *Promise‹[StoreItem](../interfaces/_hub_credentials_provider_.storeitem.md)‹never›[]›*

___

### `Protected` upsertStoreItem

▸ **upsertStoreItem**(`datalakeId`: string, `item`: [StoreItem](../interfaces/_hub_credentials_provider_.storeitem.md)‹never›): *Promise‹void›*

*Overrides [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md).[upsertStoreItem](_hub_credentials_provider_.cortexcredentialprovider.md#protected-abstract-upsertstoreitem)*

Defined in src/hub/credentials_provider_simple.ts:91

**Parameters:**

Name | Type |
------ | ------ |
`datalakeId` | string |
`item` | [StoreItem](../interfaces/_hub_credentials_provider_.storeitem.md)‹never› |

**Returns:** *Promise‹void›*

___

### `Static` factory

▸ **factory**(`ops?`: [CredentialProviderOptions](../interfaces/_hub_credentials_provider_.credentialprovideroptions.md) & object): *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

Defined in src/hub/credentials_provider_simple.ts:57

Instantiates a *memory-only* CredentialProvider subclass with only one data lake manually
registered. Obtains all configuration values either from provided configuration options or
from environmental variables.

**Parameters:**

Name | Type |
------ | ------ |
`ops?` | [CredentialProviderOptions](../interfaces/_hub_credentials_provider_.credentialprovideroptions.md) & object |

**Returns:** *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

a Credentials object bound to the provided `refresh_token`

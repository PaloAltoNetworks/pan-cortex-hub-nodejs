[pan-cortex-hub](../README.md) › [CortexCredentialProvider](cortexcredentialprovider.md)

# Class: CortexCredentialProvider <**T**>

Abstract class to provide credentials for multiple datalakes. If you want to
extend this class then you must implement its storage-related methods. *`T`*
describes the type of the optional metadata that can be attached to any
datalake's record.

## Type parameters

▪ **T**

type of the metadata to attach to any data lake instance

## Hierarchy

* **CortexCredentialProvider**

  ↳ [SimpleCredentialsProvider](simplecredentialsprovider.md)

  ↳ [FsCredProvider](fscredprovider.md)

  ↳ [CredentialsDebugger](credentialsdebugger.md)

## Index

### Constructors

* [constructor](cortexcredentialprovider.md#protected-constructor)

### Properties

* [store](cortexcredentialprovider.md#protected-store)

### Methods

* [addWithCode](cortexcredentialprovider.md#addwithcode)
* [addWithRefreshToken](cortexcredentialprovider.md#addwithrefreshtoken)
* [deleteDatalake](cortexcredentialprovider.md#deletedatalake)
* [deleteStoreItem](cortexcredentialprovider.md#protected-abstract-deletestoreitem)
* [getAccessToken](cortexcredentialprovider.md#getaccesstoken)
* [getClientId](cortexcredentialprovider.md#getclientid)
* [getCredentialsObject](cortexcredentialprovider.md#getcredentialsobject)
* [getStoreItem](cortexcredentialprovider.md#protected-abstract-getstoreitem)
* [loadDb](cortexcredentialprovider.md#abstract-loaddb)
* [revokeDatalake](cortexcredentialprovider.md#revokedatalake)
* [storeItem](cortexcredentialprovider.md#storeitem)
* [upsertStoreItem](cortexcredentialprovider.md#protected-abstract-upsertstoreitem)

## Constructors

### `Protected` constructor

\+ **new CortexCredentialProvider**(`ops`: [CredentialProviderOptions](../interfaces/credentialprovideroptions.md) & object): *[CortexCredentialProvider](cortexcredentialprovider.md)*

Defined in src/hub/credentials_provider.ts:172

Class constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ops` | [CredentialProviderOptions](../interfaces/credentialprovideroptions.md) & object | constructor options. Mandatory fields being OAUTH2 `clientId` and `clientSecret`  |

**Returns:** *[CortexCredentialProvider](cortexcredentialprovider.md)*

## Properties

### `Protected` store

• **store**: *object*

Defined in src/hub/credentials_provider.ts:168

#### Type declaration:

* \[ **dlid**: *string*\]: [StoreItem](../interfaces/storeitem.md)‹T›

## Methods

###  addWithCode

▸ **addWithCode**(`datalakeId`: string, `entryPoint`: string, `oa2code`: object, `metadata?`: T): *Promise‹[Credentials](../interfaces/credentials.md)›*

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

**Returns:** *Promise‹[Credentials](../interfaces/credentials.md)›*

a `Credentials` object for the new registered data lake

___

###  addWithRefreshToken

▸ **addWithRefreshToken**(`datalakeId`: string, `entryPoint`: string, `refreshToken`: string, `prefetch?`: undefined | object, `metadata?`: T): *Promise‹[Credentials](../interfaces/credentials.md)›*

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

**Returns:** *Promise‹[Credentials](../interfaces/credentials.md)›*

a `Credentials` object for the new registered data lake

___

###  deleteDatalake

▸ **deleteDatalake**(`datalakeId`: string): *Promise‹void›*

Defined in src/hub/credentials_provider.ts:461

Completely removes a datalake from the store (it revokes the refresh
token if already authorized)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | ID of the datalake to be removed  |

**Returns:** *Promise‹void›*

___

### `Protected` `Abstract` deleteStoreItem

▸ **deleteStoreItem**(`datalakeId`: string): *Promise‹void›*

Defined in src/hub/credentials_provider.ts:529

Implementation dependant. Must delete an item from the store

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | datalake identificator  |

**Returns:** *Promise‹void›*

___

###  getAccessToken

▸ **getAccessToken**(`datalakeId`: string, `force`: boolean): *Promise‹string | undefined›*

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

Defined in src/hub/credentials_provider.ts:199

Exposes the OAuth2 application client_id

**Returns:** *string*

this CredentialProvider class OAUTH2 `clientId`

___

###  getCredentialsObject

▸ **getCredentialsObject**(`datalakeId`: string): *Promise‹[Credentials](../interfaces/credentials.md)›*

Defined in src/hub/credentials_provider.ts:401

Retrieves the Credentials object for a given datalake

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | ID of the datalake the Credentials object should be bound to |

**Returns:** *Promise‹[Credentials](../interfaces/credentials.md)›*

a `Credentials` object for the requested data lake

___

### `Protected` `Abstract` getStoreItem

▸ **getStoreItem**(`datalakeId`: string): *Promise‹[StoreItem](../interfaces/storeitem.md)‹T› | undefined›*

Defined in src/hub/credentials_provider.ts:536

Implementation dependant. Must return the store item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | datalake identificator |

**Returns:** *Promise‹[StoreItem](../interfaces/storeitem.md)‹T› | undefined›*

the corresponding item from the store

___

### `Abstract` loadDb

▸ **loadDb**(): *Promise‹void›*

Defined in src/hub/credentials_provider.ts:543

Implementation dependant. A way to trigger the external DB initial load must be provided.
The subclass implementation should compare the protected object `store`
with the external data and update it if needed.

**Returns:** *Promise‹void›*

___

###  revokeDatalake

▸ **revokeDatalake**(`datalakeId`: string): *Promise‹void›*

Defined in src/hub/credentials_provider.ts:421

Revokes a previous authorized datalake (revokes its OAUTH2 `refresh_token`)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | ID of the datalake to be removed  |

**Returns:** *Promise‹void›*

___

###  storeItem

▸ **storeItem**(`dlid`: string): *Promise‹[StoreItem](../interfaces/storeitem.md)‹T› | undefined›*

Defined in src/hub/credentials_provider.ts:210

Exposes the internal store. It does not deep-copy the objects so take
extra care when modifying its content. Do not use this method unless you
know what you're doing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dlid` | string | store item identifier |

**Returns:** *Promise‹[StoreItem](../interfaces/storeitem.md)‹T› | undefined›*

▸ **storeItem**(`dlid`: string, `value`: [StoreItem](../interfaces/storeitem.md)‹T›): *Promise‹void›*

Defined in src/hub/credentials_provider.ts:211

**Parameters:**

Name | Type |
------ | ------ |
`dlid` | string |
`value` | [StoreItem](../interfaces/storeitem.md)‹T› |

**Returns:** *Promise‹void›*

▸ **storeItem**(): *Promise‹[StoreItem](../interfaces/storeitem.md)‹T›[]›*

Defined in src/hub/credentials_provider.ts:212

**Returns:** *Promise‹[StoreItem](../interfaces/storeitem.md)‹T›[]›*

___

### `Protected` `Abstract` upsertStoreItem

▸ **upsertStoreItem**(`datalakeId`: string, `item`: [StoreItem](../interfaces/storeitem.md)‹T›): *Promise‹void›*

Defined in src/hub/credentials_provider.ts:523

Implementation dependant. Must create or update the corresponfing item in
the store

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | datalake identificator |
`item` | [StoreItem](../interfaces/storeitem.md)‹T› | element to be stored |

**Returns:** *Promise‹void›*

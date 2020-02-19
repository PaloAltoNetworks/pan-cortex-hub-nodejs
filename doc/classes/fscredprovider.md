[pan-cortex-hub](../README.md) › [FsCredProvider](fscredprovider.md)

# Class: FsCredProvider <**T**>

Implements the CortexCredentialProvider abstract class using a local file as
secret vault. Use the static method `factory` to instantiate and object of this class.

## Type parameters

▪ **T**

type of the metadata to attach to any data lake instance

## Hierarchy

* [CortexCredentialProvider](cortexcredentialprovider.md)‹T›

  ↳ **FsCredProvider**

## Index

### Constructors

* [constructor](fscredprovider.md#protected-constructor)

### Properties

* [store](fscredprovider.md#protected-store)

### Methods

* [addWithCode](fscredprovider.md#addwithcode)
* [addWithRefreshToken](fscredprovider.md#addwithrefreshtoken)
* [deleteDatalake](fscredprovider.md#deletedatalake)
* [deleteStoreItem](fscredprovider.md#protected-deletestoreitem)
* [getAccessToken](fscredprovider.md#getaccesstoken)
* [getClientId](fscredprovider.md#getclientid)
* [getCredentialsObject](fscredprovider.md#getcredentialsobject)
* [getStoreItem](fscredprovider.md#protected-getstoreitem)
* [loadDb](fscredprovider.md#loaddb)
* [revokeDatalake](fscredprovider.md#revokedatalake)
* [storeItem](fscredprovider.md#storeitem)
* [upsertStoreItem](fscredprovider.md#protected-upsertstoreitem)
* [factory](fscredprovider.md#static-factory)

## Constructors

### `Protected` constructor

\+ **new FsCredProvider**(`ops`: [CredentialProviderOptions](../interfaces/credentialprovideroptions.md) & object): *[FsCredProvider](fscredprovider.md)*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[constructor](cortexcredentialprovider.md#protected-constructor)*

*Defined in [src/hub/credentials_provider.ts:173](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L173)*

Class constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ops` | [CredentialProviderOptions](../interfaces/credentialprovideroptions.md) & object | constructor options. Mandatory fields being OAUTH2 `clientId` and `clientSecret`  |

**Returns:** *[FsCredProvider](fscredprovider.md)*

## Properties

### `Protected` store

• **store**: *object*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[store](cortexcredentialprovider.md#protected-store)*

*Defined in [src/hub/credentials_provider.ts:168](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L168)*

#### Type declaration:

* \[ **dlid**: *string*\]: [StoreItem](../interfaces/storeitem.md)‹T›

## Methods

###  addWithCode

▸ **addWithCode**(`datalakeId`: string, `entryPoint`: string, `oa2code`: object, `metadata?`: T): *Promise‹[Credentials](../interfaces/credentials.md)›*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[addWithCode](cortexcredentialprovider.md#addwithcode)*

*Defined in [src/hub/credentials_provider.ts:369](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L369)*

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

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[addWithRefreshToken](cortexcredentialprovider.md#addwithrefreshtoken)*

*Defined in [src/hub/credentials_provider.ts:327](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L327)*

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

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[deleteDatalake](cortexcredentialprovider.md#deletedatalake)*

*Defined in [src/hub/credentials_provider.ts:462](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L462)*

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

*Overrides [CortexCredentialProvider](cortexcredentialprovider.md).[deleteStoreItem](cortexcredentialprovider.md#protected-abstract-deletestoreitem)*

*Defined in [src/hub/credentials_provider_fs.ts:168](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider_fs.ts#L168)*

**Parameters:**

Name | Type |
------ | ------ |
`datalakeId` | string |

**Returns:** *Promise‹void›*

___

###  getAccessToken

▸ **getAccessToken**(`datalakeId`: string, `force`: boolean): *Promise‹string | undefined›*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[getAccessToken](cortexcredentialprovider.md#getaccesstoken)*

*Defined in [src/hub/credentials_provider.ts:477](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L477)*

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

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[getClientId](cortexcredentialprovider.md#getclientid)*

*Defined in [src/hub/credentials_provider.ts:200](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L200)*

Exposes the OAuth2 application client_id

**Returns:** *string*

this CredentialProvider class OAUTH2 `clientId`

___

###  getCredentialsObject

▸ **getCredentialsObject**(`datalakeId`: string): *Promise‹[Credentials](../interfaces/credentials.md)›*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[getCredentialsObject](cortexcredentialprovider.md#getcredentialsobject)*

*Defined in [src/hub/credentials_provider.ts:402](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L402)*

Retrieves the Credentials object for a given datalake

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | ID of the datalake the Credentials object should be bound to |

**Returns:** *Promise‹[Credentials](../interfaces/credentials.md)›*

a `Credentials` object for the requested data lake

___

### `Protected` getStoreItem

▸ **getStoreItem**(`datalakeId`: string): *Promise‹[StoreItem](../interfaces/storeitem.md)‹T››*

*Overrides [CortexCredentialProvider](cortexcredentialprovider.md).[getStoreItem](cortexcredentialprovider.md#protected-abstract-getstoreitem)*

*Defined in [src/hub/credentials_provider_fs.ts:173](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider_fs.ts#L173)*

**Parameters:**

Name | Type |
------ | ------ |
`datalakeId` | string |

**Returns:** *Promise‹[StoreItem](../interfaces/storeitem.md)‹T››*

___

###  loadDb

▸ **loadDb**(): *Promise‹void›*

*Overrides [CortexCredentialProvider](cortexcredentialprovider.md).[loadDb](cortexcredentialprovider.md#abstract-loaddb)*

*Defined in [src/hub/credentials_provider_fs.ts:137](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider_fs.ts#L137)*

Loads the data in the file

**Returns:** *Promise‹void›*

___

###  revokeDatalake

▸ **revokeDatalake**(`datalakeId`: string): *Promise‹void›*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[revokeDatalake](cortexcredentialprovider.md#revokedatalake)*

*Defined in [src/hub/credentials_provider.ts:422](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L422)*

Revokes a previous authorized datalake (revokes its OAUTH2 `refresh_token`)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | ID of the datalake to be removed  |

**Returns:** *Promise‹void›*

___

###  storeItem

▸ **storeItem**(`dlid`: string): *Promise‹[StoreItem](../interfaces/storeitem.md)‹T› | undefined›*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[storeItem](cortexcredentialprovider.md#storeitem)*

*Defined in [src/hub/credentials_provider.ts:211](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L211)*

Exposes the internal store. It does not deep-copy the objects so take
extra care when modifying its content. Do not use this method unless you
know what you're doing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dlid` | string | store item identifier |

**Returns:** *Promise‹[StoreItem](../interfaces/storeitem.md)‹T› | undefined›*

▸ **storeItem**(`dlid`: string, `value`: [StoreItem](../interfaces/storeitem.md)‹T›): *Promise‹void›*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[storeItem](cortexcredentialprovider.md#storeitem)*

*Defined in [src/hub/credentials_provider.ts:212](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L212)*

**Parameters:**

Name | Type |
------ | ------ |
`dlid` | string |
`value` | [StoreItem](../interfaces/storeitem.md)‹T› |

**Returns:** *Promise‹void›*

▸ **storeItem**(): *Promise‹[StoreItem](../interfaces/storeitem.md)‹T›[]›*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[storeItem](cortexcredentialprovider.md#storeitem)*

*Defined in [src/hub/credentials_provider.ts:213](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L213)*

**Returns:** *Promise‹[StoreItem](../interfaces/storeitem.md)‹T›[]›*

___

### `Protected` upsertStoreItem

▸ **upsertStoreItem**(`datalakeId`: string, `item`: [StoreItem](../interfaces/storeitem.md)‹T›): *Promise‹void›*

*Overrides [CortexCredentialProvider](cortexcredentialprovider.md).[upsertStoreItem](cortexcredentialprovider.md#protected-abstract-upsertstoreitem)*

*Defined in [src/hub/credentials_provider_fs.ts:163](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider_fs.ts#L163)*

**Parameters:**

Name | Type |
------ | ------ |
`datalakeId` | string |
`item` | [StoreItem](../interfaces/storeitem.md)‹T› |

**Returns:** *Promise‹void›*

___

### `Static` factory

▸ **factory**<**T**>(`ops?`: [FsCredProviderOptions](../interfaces/fscredprovideroptions.md)): *Promise‹[FsCredProvider](fscredprovider.md)‹T››*

*Defined in [src/hub/credentials_provider_fs.ts:70](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider_fs.ts#L70)*

Initializes a `CortexCredentialProvider` subclass that leverages the local filesystem as storage.
State data will be stored in the file `PANCLOUD_CONFIG.json` option
`configFile` is not provided.
Gets all its configuration options either from optional properties of from environmental variables.
Important properties in the `ops` object are:

**Type parameters:**

▪ **T**

type of the metadata to attach to any data lake instance

**Parameters:**

Name | Type |
------ | ------ |
`ops?` | [FsCredProviderOptions](../interfaces/fscredprovideroptions.md) |

**Returns:** *Promise‹[FsCredProvider](fscredprovider.md)‹T››*

an initializated `FsCredProvider` object

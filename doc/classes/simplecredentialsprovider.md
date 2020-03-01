[@paloaltonetworks/pan-cortex-hub](../README.md) › [SimpleCredentialsProvider](simplecredentialsprovider.md)

# Class: SimpleCredentialsProvider

Memory-only implementation of the abstract class `CortexCredentialProvider`
to be used for quick starting Cortex API experiments with just one active
data lake. You only need to provide the OAuth2 application secret (client_id
and client_secret) as well as the refresh token value for the single data
lake to experiment with.

Use the static method `factory` to instantiate an object of this class.

## Hierarchy

* [CortexCredentialProvider](cortexcredentialprovider.md)‹never›

  ↳ **SimpleCredentialsProvider**

## Implements

* [SecretsStorage](../interfaces/secretsstorage.md)‹never›

## Index

### Constructors

* [constructor](simplecredentialsprovider.md#protected-constructor)

### Properties

* [store](simplecredentialsprovider.md#store)

### Methods

* [addWithCode](simplecredentialsprovider.md#addwithcode)
* [addWithRefreshToken](simplecredentialsprovider.md#addwithrefreshtoken)
* [deleteDatalake](simplecredentialsprovider.md#deletedatalake)
* [deleteStoreItem](simplecredentialsprovider.md#deletestoreitem)
* [getAccessToken](simplecredentialsprovider.md#getaccesstoken)
* [getClientId](simplecredentialsprovider.md#getclientid)
* [getCredentialsObject](simplecredentialsprovider.md#getcredentialsobject)
* [getStoreItem](simplecredentialsprovider.md#getstoreitem)
* [loadDb](simplecredentialsprovider.md#loaddb)
* [revokeDatalake](simplecredentialsprovider.md#revokedatalake)
* [storeItem](simplecredentialsprovider.md#storeitem)
* [upsertStoreItem](simplecredentialsprovider.md#upsertstoreitem)
* [factory](simplecredentialsprovider.md#static-factory)

## Constructors

### `Protected` constructor

\+ **new SimpleCredentialsProvider**(`ops`: [CredentialProviderOptions](../interfaces/credentialprovideroptions.md) & object): *[SimpleCredentialsProvider](simplecredentialsprovider.md)*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[constructor](cortexcredentialprovider.md#protected-constructor)*

*Defined in [src/hub/credentials_provider.ts:208](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L208)*

Class constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ops` | [CredentialProviderOptions](../interfaces/credentialprovideroptions.md) & object | constructor options. Mandatory fields being OAUTH2 `clientId` and `clientSecret`  |

**Returns:** *[SimpleCredentialsProvider](simplecredentialsprovider.md)*

## Properties

###  store

• **store**: *object*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[store](cortexcredentialprovider.md#store)*

*Defined in [src/hub/credentials_provider.ts:203](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L203)*

#### Type declaration:

* \[ **dlid**: *string*\]: [StoreItem](../interfaces/storeitem.md)‹never›

## Methods

###  addWithCode

▸ **addWithCode**(`datalakeId`: string, `entryPoint`: string, `oa2code`: object, `metadata?`: T): *Promise‹[Credentials](../interfaces/credentials.md)›*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[addWithCode](cortexcredentialprovider.md#addwithcode)*

*Defined in [src/hub/credentials_provider.ts:404](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L404)*

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

*Defined in [src/hub/credentials_provider.ts:362](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L362)*

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

*Defined in [src/hub/credentials_provider.ts:497](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L497)*

Completely removes a datalake from the store (it revokes the refresh
token if already authorized)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | ID of the datalake to be removed  |

**Returns:** *Promise‹void›*

___

###  deleteStoreItem

▸ **deleteStoreItem**(`datalakeId`: string): *Promise‹void›*

*Implementation of [SecretsStorage](../interfaces/secretsstorage.md)*

*Overrides [CortexCredentialProvider](cortexcredentialprovider.md).[deleteStoreItem](cortexcredentialprovider.md#abstract-deletestoreitem)*

*Defined in [src/hub/credentials_provider_simple.ts:95](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider_simple.ts#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`datalakeId` | string |

**Returns:** *Promise‹void›*

___

###  getAccessToken

▸ **getAccessToken**(`datalakeId`: string, `force`: boolean): *Promise‹string | undefined›*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[getAccessToken](cortexcredentialprovider.md#getaccesstoken)*

*Defined in [src/hub/credentials_provider.ts:512](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L512)*

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

*Defined in [src/hub/credentials_provider.ts:235](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L235)*

Exposes the OAuth2 application client_id

**Returns:** *string*

this CredentialProvider class OAUTH2 `clientId`

___

###  getCredentialsObject

▸ **getCredentialsObject**(`datalakeId`: string): *Promise‹[Credentials](../interfaces/credentials.md)›*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[getCredentialsObject](cortexcredentialprovider.md#getcredentialsobject)*

*Defined in [src/hub/credentials_provider.ts:437](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L437)*

Retrieves the Credentials object for a given datalake

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | ID of the datalake the Credentials object should be bound to |

**Returns:** *Promise‹[Credentials](../interfaces/credentials.md)›*

a `Credentials` object for the requested data lake

___

###  getStoreItem

▸ **getStoreItem**(`datalakeId`: string): *Promise‹[StoreItem](../interfaces/storeitem.md)‹never››*

*Implementation of [SecretsStorage](../interfaces/secretsstorage.md)*

*Overrides [CortexCredentialProvider](cortexcredentialprovider.md).[getStoreItem](cortexcredentialprovider.md#abstract-getstoreitem)*

*Defined in [src/hub/credentials_provider_simple.ts:99](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider_simple.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`datalakeId` | string |

**Returns:** *Promise‹[StoreItem](../interfaces/storeitem.md)‹never››*

___

###  loadDb

▸ **loadDb**(): *Promise‹void›*

*Overrides [CortexCredentialProvider](cortexcredentialprovider.md).[loadDb](cortexcredentialprovider.md#abstract-loaddb)*

*Defined in [src/hub/credentials_provider_simple.ts:103](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider_simple.ts#L103)*

**Returns:** *Promise‹void›*

___

###  revokeDatalake

▸ **revokeDatalake**(`datalakeId`: string): *Promise‹void›*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[revokeDatalake](cortexcredentialprovider.md#revokedatalake)*

*Defined in [src/hub/credentials_provider.ts:457](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L457)*

Revokes a previous authorized datalake (revokes its OAUTH2 `refresh_token`)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | ID of the datalake to be removed  |

**Returns:** *Promise‹void›*

___

###  storeItem

▸ **storeItem**(`dlid`: string): *Promise‹[StoreItem](../interfaces/storeitem.md)‹never› | undefined›*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[storeItem](cortexcredentialprovider.md#storeitem)*

*Defined in [src/hub/credentials_provider.ts:246](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L246)*

Exposes the internal store. It does not deep-copy the objects so take
extra care when modifying its content. Do not use this method unless you
know what you're doing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dlid` | string | store item identifier |

**Returns:** *Promise‹[StoreItem](../interfaces/storeitem.md)‹never› | undefined›*

▸ **storeItem**(`dlid`: string, `value`: [StoreItem](../interfaces/storeitem.md)‹never›): *Promise‹void›*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[storeItem](cortexcredentialprovider.md#storeitem)*

*Defined in [src/hub/credentials_provider.ts:247](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L247)*

**Parameters:**

Name | Type |
------ | ------ |
`dlid` | string |
`value` | [StoreItem](../interfaces/storeitem.md)‹never› |

**Returns:** *Promise‹void›*

▸ **storeItem**(): *Promise‹[StoreItem](../interfaces/storeitem.md)‹never›[]›*

*Inherited from [CortexCredentialProvider](cortexcredentialprovider.md).[storeItem](cortexcredentialprovider.md#storeitem)*

*Defined in [src/hub/credentials_provider.ts:248](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider.ts#L248)*

**Returns:** *Promise‹[StoreItem](../interfaces/storeitem.md)‹never›[]›*

___

###  upsertStoreItem

▸ **upsertStoreItem**(`datalakeId`: string, `item`: [StoreItem](../interfaces/storeitem.md)‹never›): *Promise‹void›*

*Implementation of [SecretsStorage](../interfaces/secretsstorage.md)*

*Overrides [CortexCredentialProvider](cortexcredentialprovider.md).[upsertStoreItem](cortexcredentialprovider.md#abstract-upsertstoreitem)*

*Defined in [src/hub/credentials_provider_simple.ts:91](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider_simple.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`datalakeId` | string |
`item` | [StoreItem](../interfaces/storeitem.md)‹never› |

**Returns:** *Promise‹void›*

___

### `Static` factory

▸ **factory**(`ops?`: [CredentialProviderOptions](../interfaces/credentialprovideroptions.md) & object): *Promise‹[Credentials](../interfaces/credentials.md)›*

*Defined in [src/hub/credentials_provider_simple.ts:57](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_provider_simple.ts#L57)*

Instantiates a *memory-only* CredentialProvider subclass with only one data lake manually
registered. Obtains all configuration values either from provided configuration options or
from environmental variables.

**Parameters:**

Name | Type |
------ | ------ |
`ops?` | [CredentialProviderOptions](../interfaces/credentialprovideroptions.md) & object |

**Returns:** *Promise‹[Credentials](../interfaces/credentials.md)›*

a Credentials object bound to the provided `refresh_token`

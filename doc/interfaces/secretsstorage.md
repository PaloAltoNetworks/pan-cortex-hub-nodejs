[@paloaltonetworks/pan-cortex-hub](../README.md) › [SecretsStorage](secretsstorage.md)

# Interface: SecretsStorage <**T**>

Methods that deal with secret storage

## Type parameters

▪ **T**

## Hierarchy

* **SecretsStorage**

## Implemented by

* [CortexCredentialProvider](../classes/cortexcredentialprovider.md)
* [CredentialsDebugger](../classes/credentialsdebugger.md)
* [FsCredProvider](../classes/fscredprovider.md)
* [SimpleCredentialsProvider](../classes/simplecredentialsprovider.md)

## Index

### Methods

* [deleteStoreItem](secretsstorage.md#deletestoreitem)
* [getStoreItem](secretsstorage.md#getstoreitem)
* [loadDb](secretsstorage.md#loaddb)
* [upsertStoreItem](secretsstorage.md#upsertstoreitem)

## Methods

###  deleteStoreItem

▸ **deleteStoreItem**(`datalakeId`: string): *Promise‹void›*

*Defined in [src/hub/credentials_provider.ts:145](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L145)*

Removes an object from the store

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | the data lake unique identifier  |

**Returns:** *Promise‹void›*

___

###  getStoreItem

▸ **getStoreItem**(`datalakeId`: string): *Promise‹[StoreItem](storeitem.md)‹T› | undefined›*

*Defined in [src/hub/credentials_provider.ts:153](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L153)*

Returns a secrets object from the store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | the data lake unique identifier |

**Returns:** *Promise‹[StoreItem](storeitem.md)‹T› | undefined›*

the secrets object or undefined if it doesn't exists

___

###  loadDb

▸ **loadDb**(`store`: object): *Promise‹void›*

*Defined in [src/hub/credentials_provider.ts:162](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L162)*

Loads secrets stored externaly into the in-memory store. Implementator
should compare the passed object with the external store contents and
update the former accordingly.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`store` | object | refrence to the current in-memory store  |

**Returns:** *Promise‹void›*

___

###  upsertStoreItem

▸ **upsertStoreItem**(`datalakeId`: string, `item`: [StoreItem](storeitem.md)‹T›): *Promise‹void›*

*Defined in [src/hub/credentials_provider.ts:139](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L139)*

Creates of updates a secrets object belonging to a specific data lake identifier

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`datalakeId` | string | the data lake unique identifier |
`item` | [StoreItem](storeitem.md)‹T› | secrets object  |

**Returns:** *Promise‹void›*

[pan-cortex-hub](../README.md) › ["hub/credentials"](../modules/_hub_credentials_.md) › [Credentials](_hub_credentials_.credentials.md)

# Interface: Credentials

The basic methods expected from an object that provides credentials

## Hierarchy

* **Credentials**

## Implemented by

* [CredentialsBase](../classes/_hub_credentials_.credentialsbase.md)
* [DevTokenCredentials](../classes/_hub_credentials_devtoken_.devtokencredentials.md)
* [StaticCredentials](../classes/_hub_credentials_static_.staticcredentials.md)

## Index

### Methods

* [getEntryPoint](_hub_credentials_.credentials.md#getentrypoint)
* [getToken](_hub_credentials_.credentials.md#gettoken)

## Methods

###  getEntryPoint

▸ **getEntryPoint**(): *string*

Defined in src/hub/credentials.ts:30

Cortex Data Lake API fqdn (region) this token in valid for

**Returns:** *string*

___

###  getToken

▸ **getToken**(`force?`: undefined | false | true): *Promise‹string | undefined›*

Defined in src/hub/credentials.ts:26

Method to retrieve the token data

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`force?` | undefined &#124; false &#124; true | flag to force the response to contain token data even if a refresh operation has not been performed. An undefined response can be used by the consumer to keep using its cached data. |

**Returns:** *Promise‹string | undefined›*

credential data either if the `force` flag was set of a refresh
operation produced new credential material.

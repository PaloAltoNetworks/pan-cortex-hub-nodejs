[pan-cortex-hub](../README.md) › ["hub/credentials"](../modules/_hub_credentials_.md) › [CredentialsBase](_hub_credentials_.credentialsbase.md)

# Class: CredentialsBase

## Hierarchy

* **CredentialsBase**

  ↳ [StaticCredentials](_hub_credentials_static_.staticcredentials.md)

  ↳ [DevTokenCredentials](_hub_credentials_devtoken_.devtokencredentials.md)

## Implements

* [Credentials](../interfaces/_hub_credentials_.credentials.md)

## Index

### Constructors

* [constructor](_hub_credentials_.credentialsbase.md#protected-constructor)

### Methods

* [getEntryPoint](_hub_credentials_.credentialsbase.md#getentrypoint)
* [getToken](_hub_credentials_.credentialsbase.md#abstract-gettoken)

## Constructors

### `Protected` constructor

\+ **new CredentialsBase**(`entryPoint`: string): *[CredentialsBase](_hub_credentials_.credentialsbase.md)*

Defined in src/hub/credentials.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`entryPoint` | string |

**Returns:** *[CredentialsBase](_hub_credentials_.credentialsbase.md)*

## Methods

###  getEntryPoint

▸ **getEntryPoint**(): *string*

*Implementation of [Credentials](../interfaces/_hub_credentials_.credentials.md)*

Defined in src/hub/credentials.ts:42

**Returns:** *string*

___

### `Abstract` getToken

▸ **getToken**(`force?`: undefined | false | true): *Promise‹string | undefined›*

*Implementation of [Credentials](../interfaces/_hub_credentials_.credentials.md)*

Defined in src/hub/credentials.ts:40

**Parameters:**

Name | Type |
------ | ------ |
`force?` | undefined &#124; false &#124; true |

**Returns:** *Promise‹string | undefined›*

[@paloaltonetworks/pan-cortex-hub](../README.md) › [CredentialsBase](credentialsbase.md)

# Class: CredentialsBase

## Hierarchy

* **CredentialsBase**

  ↳ [StaticCredentials](staticcredentials.md)

  ↳ [DevTokenCredentials](devtokencredentials.md)

## Implements

* [Credentials](../interfaces/credentials.md)

## Index

### Constructors

* [constructor](credentialsbase.md#protected-constructor)

### Methods

* [getEntryPoint](credentialsbase.md#getentrypoint)
* [getToken](credentialsbase.md#abstract-gettoken)

## Constructors

### `Protected` constructor

\+ **new CredentialsBase**(`entryPoint`: string): *[CredentialsBase](credentialsbase.md)*

*Defined in [src/hub/credentials.ts:34](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`entryPoint` | string |

**Returns:** *[CredentialsBase](credentialsbase.md)*

## Methods

###  getEntryPoint

▸ **getEntryPoint**(): *string*

*Implementation of [Credentials](../interfaces/credentials.md)*

*Defined in [src/hub/credentials.ts:42](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials.ts#L42)*

**Returns:** *string*

___

### `Abstract` getToken

▸ **getToken**(`force?`: undefined | false | true): *Promise‹string | undefined›*

*Implementation of [Credentials](../interfaces/credentials.md)*

*Defined in [src/hub/credentials.ts:40](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`force?` | undefined &#124; false &#124; true |

**Returns:** *Promise‹string | undefined›*

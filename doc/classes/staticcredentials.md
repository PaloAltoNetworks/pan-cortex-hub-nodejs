[@paloaltonetworks/pan-cortex-hub](../README.md) › [StaticCredentials](staticcredentials.md)

# Class: StaticCredentials

A Credentials implementation that just wraps a explicitly provided
access_token. Any refresh call will fail so it will last as long as the
provided access_token expiration date. Use the static method `factory` to
instantiate an object of this class

## Hierarchy

* [CredentialsBase](credentialsbase.md)

  ↳ **StaticCredentials**

## Implements

* [Credentials](../interfaces/credentials.md)

## Index

### Constructors

* [constructor](staticcredentials.md#constructor)

### Methods

* [getEntryPoint](staticcredentials.md#getentrypoint)
* [getToken](staticcredentials.md#gettoken)

## Constructors

###  constructor

\+ **new StaticCredentials**(`token`: string, `entryPoint`: string): *[StaticCredentials](staticcredentials.md)*

*Overrides [CredentialsBase](credentialsbase.md).[constructor](credentialsbase.md#protected-constructor)*

*Defined in [src/hub/credentials_static.ts:23](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_static.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`token` | string |
`entryPoint` | string |

**Returns:** *[StaticCredentials](staticcredentials.md)*

## Methods

###  getEntryPoint

▸ **getEntryPoint**(): *string*

*Implementation of [Credentials](../interfaces/credentials.md)*

*Inherited from [CredentialsBase](credentialsbase.md).[getEntryPoint](credentialsbase.md#getentrypoint)*

*Defined in [src/hub/credentials.ts:42](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials.ts#L42)*

**Returns:** *string*

___

###  getToken

▸ **getToken**(`force?`: undefined | false | true): *Promise‹string | undefined›*

*Implementation of [Credentials](../interfaces/credentials.md)*

*Overrides [CredentialsBase](credentialsbase.md).[getToken](credentialsbase.md#abstract-gettoken)*

*Defined in [src/hub/credentials_static.ts:30](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_static.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`force?` | undefined &#124; false &#124; true |

**Returns:** *Promise‹string | undefined›*

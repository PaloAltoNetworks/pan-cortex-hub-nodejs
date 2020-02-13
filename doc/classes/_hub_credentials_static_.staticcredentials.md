[pan-cortex-hub](../README.md) › ["hub/credentials_static"](../modules/_hub_credentials_static_.md) › [StaticCredentials](_hub_credentials_static_.staticcredentials.md)

# Class: StaticCredentials

A Credentials implementation that just wraps a explicitly provided
access_token. Any refresh call will fail so it will last as long as the
provided access_token expiration date. Use the static method `factory` to
instantiate an object of this class

## Hierarchy

* [CredentialsBase](_hub_credentials_.credentialsbase.md)

  ↳ **StaticCredentials**

## Implements

* [Credentials](../interfaces/_hub_credentials_.credentials.md)

## Index

### Constructors

* [constructor](_hub_credentials_static_.staticcredentials.md#constructor)

### Methods

* [getEntryPoint](_hub_credentials_static_.staticcredentials.md#getentrypoint)
* [getToken](_hub_credentials_static_.staticcredentials.md#gettoken)

## Constructors

###  constructor

\+ **new StaticCredentials**(`token`: string, `entryPoint`: string): *[StaticCredentials](_hub_credentials_static_.staticcredentials.md)*

*Overrides [CredentialsBase](_hub_credentials_.credentialsbase.md).[constructor](_hub_credentials_.credentialsbase.md#protected-constructor)*

Defined in src/hub/credentials_static.ts:23

**Parameters:**

Name | Type |
------ | ------ |
`token` | string |
`entryPoint` | string |

**Returns:** *[StaticCredentials](_hub_credentials_static_.staticcredentials.md)*

## Methods

###  getEntryPoint

▸ **getEntryPoint**(): *string*

*Implementation of [Credentials](../interfaces/_hub_credentials_.credentials.md)*

*Inherited from [CredentialsBase](_hub_credentials_.credentialsbase.md).[getEntryPoint](_hub_credentials_.credentialsbase.md#getentrypoint)*

Defined in src/hub/credentials.ts:42

**Returns:** *string*

___

###  getToken

▸ **getToken**(`force?`: undefined | false | true): *Promise‹string | undefined›*

*Implementation of [Credentials](../interfaces/_hub_credentials_.credentials.md)*

*Overrides [CredentialsBase](_hub_credentials_.credentialsbase.md).[getToken](_hub_credentials_.credentialsbase.md#abstract-gettoken)*

Defined in src/hub/credentials_static.ts:30

**Parameters:**

Name | Type |
------ | ------ |
`force?` | undefined &#124; false &#124; true |

**Returns:** *Promise‹string | undefined›*

[pan-cortex-hub](../README.md) › ["hub/credentials_devtoken"](../modules/_hub_credentials_devtoken_.md) › [DevTokenCredentials](_hub_credentials_devtoken_.devtokencredentials.md)

# Class: DevTokenCredentials

Implements the Credentials abstract class with the Developer Token mechanism.
Use its static `factory` method to instantiate an object of this class.

## Hierarchy

* [CredentialsBase](_hub_credentials_.credentialsbase.md)

  ↳ **DevTokenCredentials**

## Implements

* [Credentials](../interfaces/_hub_credentials_.credentials.md)

## Index

### Constructors

* [constructor](_hub_credentials_devtoken_.devtokencredentials.md#protected-constructor)

### Methods

* [getEntryPoint](_hub_credentials_devtoken_.devtokencredentials.md#getentrypoint)
* [getToken](_hub_credentials_devtoken_.devtokencredentials.md#gettoken)
* [factory](_hub_credentials_devtoken_.devtokencredentials.md#static-factory)

## Constructors

### `Protected` constructor

\+ **new DevTokenCredentials**(`entryPoint`: string): *[DevTokenCredentials](_hub_credentials_devtoken_.devtokencredentials.md)*

*Inherited from [CredentialsBase](_hub_credentials_.credentialsbase.md).[constructor](_hub_credentials_.credentialsbase.md#protected-constructor)*

Defined in src/hub/credentials.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`entryPoint` | string |

**Returns:** *[DevTokenCredentials](_hub_credentials_devtoken_.devtokencredentials.md)*

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

Defined in src/hub/credentials_devtoken.ts:133

Returns the access token or undefined if no refresh operation has been executed

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`force?` | undefined &#124; false &#124; true | return the access token even if it has not been refreshed |

**Returns:** *Promise‹string | undefined›*

the access token if refreshed or `force` equals `true`

___

### `Static` factory

▸ **factory**(`ops?`: [DevTokenCredentialsOptions](../interfaces/_hub_credentials_devtoken_.devtokencredentialsoptions.md)): *[DevTokenCredentials](_hub_credentials_devtoken_.devtokencredentials.md)*

Defined in src/hub/credentials_devtoken.ts:92

Factory method to instantiate a DevTokenCredentials class. You must
either execute this function in an environment with the variable
PAN_DEVELOPER_TOKEN set or provide a value for the `developerToken`
option. If Cortex API is not provided (either with the variable
ENV_DEVELOPER_TOKEN_PROVIDER or as the `developerTokenProvider` value)
then it will default to the _"americas"_ region.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ops?` | [DevTokenCredentialsOptions](../interfaces/_hub_credentials_devtoken_.devtokencredentialsoptions.md) | object with configuration options for the class |

**Returns:** *[DevTokenCredentials](_hub_credentials_devtoken_.devtokencredentials.md)*

an initializated `DevTokenCredentials` object

[@paloaltonetworks/pan-cortex-hub](../README.md) › [DevTokenCredentials](devtokencredentials.md)

# Class: DevTokenCredentials

Implements the Credentials abstract class with the Developer Token mechanism.
Use its static `factory` method to instantiate an object of this class.

## Hierarchy

* [CredentialsBase](credentialsbase.md)

  ↳ **DevTokenCredentials**

## Implements

* [Credentials](../interfaces/credentials.md)

## Index

### Constructors

* [constructor](devtokencredentials.md#protected-constructor)

### Methods

* [getEntryPoint](devtokencredentials.md#getentrypoint)
* [getToken](devtokencredentials.md#gettoken)
* [factory](devtokencredentials.md#static-factory)

## Constructors

### `Protected` constructor

\+ **new DevTokenCredentials**(`entryPoint`: string): *[DevTokenCredentials](devtokencredentials.md)*

*Inherited from [CredentialsBase](credentialsbase.md).[constructor](credentialsbase.md#protected-constructor)*

*Defined in [src/hub/credentials.ts:34](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`entryPoint` | string |

**Returns:** *[DevTokenCredentials](devtokencredentials.md)*

## Methods

###  getEntryPoint

▸ **getEntryPoint**(): *string*

*Implementation of [Credentials](../interfaces/credentials.md)*

*Inherited from [CredentialsBase](credentialsbase.md).[getEntryPoint](credentialsbase.md#getentrypoint)*

*Defined in [src/hub/credentials.ts:42](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials.ts#L42)*

**Returns:** *string*

___

###  getToken

▸ **getToken**(`force?`: undefined | false | true): *Promise‹string | undefined›*

*Implementation of [Credentials](../interfaces/credentials.md)*

*Overrides [CredentialsBase](credentialsbase.md).[getToken](credentialsbase.md#abstract-gettoken)*

*Defined in [src/hub/credentials_devtoken.ts:135](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_devtoken.ts#L135)*

Returns the access token or undefined if no refresh operation has been executed

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`force?` | undefined &#124; false &#124; true | return the access token even if it has not been refreshed |

**Returns:** *Promise‹string | undefined›*

the access token if refreshed or `force` equals `true`

___

### `Static` factory

▸ **factory**(`ops?`: [DevTokenCredentialsOptions](../interfaces/devtokencredentialsoptions.md)): *[DevTokenCredentials](devtokencredentials.md)*

*Defined in [src/hub/credentials_devtoken.ts:94](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/hub/credentials_devtoken.ts#L94)*

Factory method to instantiate a DevTokenCredentials class. You must
either execute this function in an environment with the variable
PAN_DEVELOPER_TOKEN set or provide a value for the `developerToken`
option. If Cortex API is not provided (either with the variable
ENV_DEVELOPER_TOKEN_PROVIDER or as the `developerTokenProvider` value)
then it will default to the _"americas"_ region.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ops?` | [DevTokenCredentialsOptions](../interfaces/devtokencredentialsoptions.md) | object with configuration options for the class |

**Returns:** *[DevTokenCredentials](devtokencredentials.md)*

an initializated `DevTokenCredentials` object

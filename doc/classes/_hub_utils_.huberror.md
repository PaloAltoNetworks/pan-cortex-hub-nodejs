[pan-cortex-hub](../README.md) › ["hub/utils"](../modules/_hub_utils_.md) › [HubError](_hub_utils_.huberror.md)

# Class: HubError

## Hierarchy

  ↳ [SdkError](_sdkerror_.sdkerror.md)

  ↳ **HubError**

## Index

### Constructors

* [constructor](_hub_utils_.huberror.md#constructor)

### Properties

* [errorType](_hub_utils_.huberror.md#errortype)
* [message](_hub_utils_.huberror.md#message)
* [name](_hub_utils_.huberror.md#name)
* [stack](_hub_utils_.huberror.md#optional-stack)

## Constructors

###  constructor

\+ **new HubError**(`errorType`: keyof typeof ErrorTypes, ...`params`: any[]): *[HubError](_hub_utils_.huberror.md)*

*Overrides [SdkError](_sdkerror_.sdkerror.md).[constructor](_sdkerror_.sdkerror.md#constructor)*

Defined in src/hub/utils.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`errorType` | keyof typeof ErrorTypes |
`...params` | any[] |

**Returns:** *[HubError](_hub_utils_.huberror.md)*

## Properties

###  errorType

• **errorType**: *keyof typeof ErrorTypes*

*Inherited from [SdkError](_sdkerror_.sdkerror.md).[errorType](_sdkerror_.sdkerror.md#errortype)*

Defined in src/sdkError.ts:44

___

###  message

• **message**: *string*

*Inherited from [SdkError](_sdkerror_.sdkerror.md).[message](_sdkerror_.sdkerror.md#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [SdkError](_sdkerror_.sdkerror.md).[name](_sdkerror_.sdkerror.md#name)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from [SdkError](_sdkerror_.sdkerror.md).[stack](_sdkerror_.sdkerror.md#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

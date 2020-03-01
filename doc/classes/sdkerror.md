[@paloaltonetworks/pan-cortex-hub](../README.md) › [SdkError](sdkerror.md)

# Class: SdkError

Error subclass to provide developer with insights on why a given Cortex
operation failed

## Hierarchy

* [Error](sdkerror.md#static-error)

  ↳ **SdkError**

  ↳ [HubError](huberror.md)

## Index

### Constructors

* [constructor](sdkerror.md#constructor)

### Properties

* [errorType](sdkerror.md#errortype)
* [message](sdkerror.md#message)
* [name](sdkerror.md#name)
* [stack](sdkerror.md#optional-stack)
* [Error](sdkerror.md#static-error)

## Constructors

###  constructor

\+ **new SdkError**(`errorType`: keyof typeof ErrorTypes, ...`params`: any[]): *[SdkError](sdkerror.md)*

*Defined in [src/sdkError.ts:44](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/sdkError.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`errorType` | keyof typeof ErrorTypes |
`...params` | any[] |

**Returns:** *[SdkError](sdkerror.md)*

## Properties

###  errorType

• **errorType**: *keyof typeof ErrorTypes*

*Defined in [src/sdkError.ts:44](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/master/src/sdkError.ts#L44)*

___

###  message

• **message**: *string*

*Inherited from [SdkError](sdkerror.md).[message](sdkerror.md#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [SdkError](sdkerror.md).[name](sdkerror.md#name)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from [SdkError](sdkerror.md).[stack](sdkerror.md#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:984

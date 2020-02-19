[pan-cortex-hub](../README.md) › [HubError](huberror.md)

# Class: HubError

## Hierarchy

  ↳ [SdkError](sdkerror.md)

  ↳ **HubError**

## Index

### Constructors

* [constructor](huberror.md#constructor)

### Properties

* [errorType](huberror.md#errortype)
* [message](huberror.md#message)
* [name](huberror.md#name)
* [stack](huberror.md#optional-stack)

## Constructors

###  constructor

\+ **new HubError**(`errorType`: keyof typeof ErrorTypes, ...`params`: any[]): *[HubError](huberror.md)*

*Overrides [SdkError](sdkerror.md).[constructor](sdkerror.md#constructor)*

*Defined in [src/hub/utils.ts:34](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/utils.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`errorType` | keyof typeof ErrorTypes |
`...params` | any[] |

**Returns:** *[HubError](huberror.md)*

## Properties

###  errorType

• **errorType**: *keyof typeof ErrorTypes*

*Inherited from [SdkError](sdkerror.md).[errorType](sdkerror.md#errortype)*

*Defined in [src/sdkError.ts:44](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/sdkError.ts#L44)*

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

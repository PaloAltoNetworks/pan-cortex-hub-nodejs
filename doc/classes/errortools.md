[pan-cortex-hub](../README.md) › [ErrorTools](errortools.md)

# Class: ErrorTools <**P**>

Convenience class to rety operations that could fail. The type `<P>`
describes the class type that would be thrown (if needed)

## Type parameters

▪ **P**: *[Error](sdkerror.md#static-error)*

## Hierarchy

* **ErrorTools**

## Index

### Constructors

* [constructor](errortools.md#constructor)

### Methods

* [retrier](errortools.md#retrier)
* [tryAsyncOp](errortools.md#tryasyncop)
* [tryOp](errortools.md#tryop)

## Constructors

###  constructor

\+ **new ErrorTools**(`errClass`: object): *[ErrorTools](errortools.md)*

*Defined in [src/fetch.ts:126](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/fetch.ts#L126)*

Builds an `ErrorTools` object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`errClass` | object | error class constructor that should be used if something needs to be thrown  |

**Returns:** *[ErrorTools](errortools.md)*

## Methods

###  retrier

▸ **retrier**<**T**, **O**>(`errorType`: keyof typeof ErrorTypes, `n`: number, `delay`: number, `op`: function, ...`params`: T[]): *Promise‹O›*

*Defined in [src/fetch.ts:180](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/fetch.ts#L180)*

Generic retrier method that attemps to execute a function that returns a
response of type `<O>` provided an arrays of arguments of type `<T>`

**Type parameters:**

▪ **T**

▪ **O**

**Parameters:**

▪ **errorType**: *keyof typeof ErrorTypes*

The type of the error that will be thrown in case of failure

▪`Default value`  **n**: *number*= 3

amount of times to attempt the operation (defaults to 3)

▪`Default value`  **delay**: *number*= 100

amounts of milliseconds to delay between attempts (defaults
to 100)

▪ **op**: *function*

function to be called

▸ (...`args`: T[]): *Promise‹O›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | T[] |

▪... **params**: *T[]*

arguments to be passed to the previous function

**Returns:** *Promise‹O›*

a Promise with the result of the called function

___

###  tryAsyncOp

▸ **tryAsyncOp**<**T**, **U**>(`errorType`: keyof typeof ErrorTypes, `op`: function, ...`params`: U): *Promise‹T›*

*Defined in [src/fetch.ts:161](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/fetch.ts#L161)*

Attempt an async operation that returns an object of type `<T>` and that
consumes arguments of type `...<U>[]`

**Type parameters:**

▪ **T**

▪ **U**: *any[]*

**Parameters:**

▪ **errorType**: *keyof typeof ErrorTypes*

The type of the error that will be thrown in case of failure

▪ **op**: *function*

function to call

▸ (...`params`: U): *Promise‹T›*

**Parameters:**

Name | Type |
------ | ------ |
`...params` | U |

▪... **params**: *U*

arguments to pass to the previous function

**Returns:** *Promise‹T›*

a promise with the response provided by the function

___

###  tryOp

▸ **tryOp**<**T**, **U**>(`errorType`: keyof typeof ErrorTypes, `op`: function, ...`params`: U): *T*

*Defined in [src/fetch.ts:145](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/fetch.ts#L145)*

Attempt an operation that returns an object of type `<T>` and that
consumes arguments of type `...<U>[]`

**Type parameters:**

▪ **T**

▪ **U**: *any[]*

**Parameters:**

▪ **errorType**: *keyof typeof ErrorTypes*

The type of the error that will be thrown in case of failure

▪ **op**: *function*

function to call

▸ (...`params`: U): *T*

**Parameters:**

Name | Type |
------ | ------ |
`...params` | U |

▪... **params**: *U*

arguments to pass to the previous function

**Returns:** *T*

the response provided by the function

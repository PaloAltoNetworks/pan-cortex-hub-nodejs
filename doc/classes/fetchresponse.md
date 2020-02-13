[pan-cortex-hub](../README.md) › [FetchResponse](fetchresponse.md)

# Class: FetchResponse

## Hierarchy

* **FetchResponse**

## Index

### Properties

* [ok](fetchresponse.md#ok)
* [size](fetchresponse.md#size)
* [status](fetchresponse.md#status)
* [statusText](fetchresponse.md#statustext)

### Methods

* [json](fetchresponse.md#json)
* [text](fetchresponse.md#text)
* [response](fetchresponse.md#static-response)

## Properties

###  ok

• **ok**: *boolean*

Defined in src/fetch.ts:52

___

###  size

• **size**: *number*

Defined in src/fetch.ts:55

___

###  status

• **status**: *number*

Defined in src/fetch.ts:53

___

###  statusText

• **statusText**: *string*

Defined in src/fetch.ts:54

## Methods

###  json

▸ **json**(): *any*

Defined in src/fetch.ts:70

**Returns:** *any*

___

###  text

▸ **text**(): *string*

Defined in src/fetch.ts:66

**Returns:** *string*

___

### `Static` response

▸ **response**(`ok`: boolean, `data?`: undefined | string, `status?`: undefined | number): *[FetchResponse](fetchresponse.md)*

Defined in src/fetch.ts:74

**Parameters:**

Name | Type |
------ | ------ |
`ok` | boolean |
`data?` | undefined &#124; string |
`status?` | undefined &#124; number |

**Returns:** *[FetchResponse](fetchresponse.md)*

[pan-cortex-hub](../README.md) › ["fetch"](_fetch_.md)

# External module: "fetch"

## Index

### Classes

* [ErrorTools](../classes/_fetch_.errortools.md)

### Interfaces

* [FetchOptions](../interfaces/_fetch_.fetchoptions.md)

### Type aliases

* [HttpMethod](_fetch_.md#httpmethod)

### Functions

* [fetch](_fetch_.md#fetch)

## Type aliases

###  HttpMethod

Ƭ **HttpMethod**: *"GET" | "POST" | "PUT" | "DELETE"*

Defined in src/fetch.ts:22

Supported HTTP methods

## Functions

###  fetch

▸ **fetch**(`url`: string, `ops`: [FetchOptions](../interfaces/_fetch_.fetchoptions.md)): *Promise‹FetchResponse›*

Defined in src/fetch.ts:85

convenience method to perform a HTTP request

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`url` | string | url of the endpoint |
`ops` | [FetchOptions](../interfaces/_fetch_.fetchoptions.md) | configuration options for the request |

**Returns:** *Promise‹FetchResponse›*

the request response

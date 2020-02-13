[pan-cortex-hub](../README.md) › ["hub/hubhelper"](_hub_hubhelper_.md)

# External module: "hub/hubhelper"

## Index

### Classes

* [CortexHubHelper](../classes/_hub_hubhelper_.cortexhubhelper.md)

### Interfaces

* [CortexClientParams](../interfaces/_hub_hubhelper_.cortexclientparams.md)
* [CortexHelperOptions](../interfaces/_hub_hubhelper_.cortexhelperoptions.md)
* [HubMetadata](../interfaces/_hub_hubhelper_.hubmetadata.md)

### Functions

* [isCortexClientParams](_hub_hubhelper_.md#iscortexclientparams)
* [isHubMetadata](_hub_hubhelper_.md#ishubmetadata)

## Functions

###  isCortexClientParams

▸ **isCortexClientParams**<**T**>(`obj`: any): *obj is CortexClientParams<T>*

Defined in src/hub/hubhelper.ts:69

Convenience type guard function to check if a given object conforms to the
`CortexClientParams` interface

**Type parameters:**

▪ **T**: *object*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`obj` | any | the object to be checked |

**Returns:** *obj is CortexClientParams<T>*

true if the provided object conforms to the `CortexClientParams` interface

___

###  isHubMetadata

▸ **isHubMetadata**(`obj`: any): *obj is HubMetadata<never>*

Defined in src/hub/hubhelper.ts:104

Convenience type guard function to check if an object is a valid HubMetadata type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`obj` | any | object to be checked  |

**Returns:** *obj is HubMetadata<never>*

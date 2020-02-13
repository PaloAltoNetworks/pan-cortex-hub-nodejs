[pan-cortex-hub](../README.md) › ["hub/hubhelper"](../modules/_hub_hubhelper_.md) › [CortexClientParams](_hub_hubhelper_.cortexclientparams.md)

# Interface: CortexClientParams <**T**>

Describes the `params` object provided by Cortex hub.

**`typeparams`** T must extend a string dictionary and is expected to contain the
*custom fields* provided by the application in the manifest file

## Type parameters

▪ **T**: *object*

## Hierarchy

* **CortexClientParams**

## Index

### Properties

* [customFields](_hub_hubhelper_.cortexclientparams.md#optional-customfields)
* [instance_id](_hub_hubhelper_.cortexclientparams.md#instance_id)
* [instance_name](_hub_hubhelper_.cortexclientparams.md#optional-instance_name)
* [location](_hub_hubhelper_.cortexclientparams.md#location)
* [lsn](_hub_hubhelper_.cortexclientparams.md#optional-lsn)

## Properties

### `Optional` customFields

• **customFields**? : *T*

Defined in src/hub/hubhelper.ts:60

Optional fields requested in the application manifest file

___

###  instance_id

• **instance_id**: *string*

Defined in src/hub/hubhelper.ts:33

Unique ID assigned by Cortex HUB to this application<->datalake combination

___

### `Optional` instance_name

• **instance_name**? : *undefined | string*

Defined in src/hub/hubhelper.ts:38

Convenient placeholder to allow applications using this SDK attach a friendly name to
the Instance ID

___

###  location

• **location**: *object*

Defined in src/hub/hubhelper.ts:43

Augmented `region` property provided by Cortex hub. Use the `paramsaParser` method to generate
this augmentation out of the BASE64 string provided by Cortex hub

#### Type declaration:

* **entryPoint**: *string*

* **region**: *string*

___

### `Optional` lsn

• **lsn**? : *undefined | string*

Defined in src/hub/hubhelper.ts:56

Serial number of the Cortex Datalake at the other end of this Instance ID

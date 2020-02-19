[pan-cortex-hub](../README.md) › [CortexClientParams](cortexclientparams.md)

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

* [customFields](cortexclientparams.md#optional-customfields)
* [instance_id](cortexclientparams.md#instance_id)
* [instance_name](cortexclientparams.md#optional-instance_name)
* [location](cortexclientparams.md#location)
* [lsn](cortexclientparams.md#optional-lsn)

## Properties

### `Optional` customFields

• **customFields**? : *T*

*Defined in [src/hub/hubhelper.ts:60](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L60)*

Optional fields requested in the application manifest file

___

###  instance_id

• **instance_id**: *string*

*Defined in [src/hub/hubhelper.ts:33](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L33)*

Unique ID assigned by Cortex HUB to this application<->datalake combination

___

### `Optional` instance_name

• **instance_name**? : *undefined | string*

*Defined in [src/hub/hubhelper.ts:38](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L38)*

Convenient placeholder to allow applications using this SDK attach a friendly name to
the Instance ID

___

###  location

• **location**: *object*

*Defined in [src/hub/hubhelper.ts:43](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L43)*

Augmented `region` property provided by Cortex hub. Use the `paramsaParser` method to generate
this augmentation out of the BASE64 string provided by Cortex hub

#### Type declaration:

* **entryPoint**: *string*

* **region**: *string*

___

### `Optional` lsn

• **lsn**? : *undefined | string*

*Defined in [src/hub/hubhelper.ts:56](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L56)*

Serial number of the Cortex Datalake at the other end of this Instance ID

[pan-cortex-hub](../README.md) › [HubMetadata](hubmetadata.md)

# Interface: HubMetadata <**T**>

Metadata attached by HubHelper into CredentialProviders store

## Type parameters

▪ **T**: *object*

## Hierarchy

* **HubMetadata**

## Index

### Properties

* [clientParams](hubmetadata.md#clientparams)
* [datalakeId](hubmetadata.md#datalakeid)
* [stateCode](hubmetadata.md#statecode)
* [tenantId](hubmetadata.md#tenantid)

## Properties

###  clientParams

• **clientParams**: *[CortexClientParams](cortexclientparams.md)‹T›*

Defined in src/hub/hubhelper.ts:97

Decoded params as provided by Cortex Hub

___

###  datalakeId

• **datalakeId**: *string*

Defined in src/hub/hubhelper.ts:89

Requested datalakeID

___

###  stateCode

• **stateCode**: *object*

Defined in src/hub/hubhelper.ts:93

State codes generated for this datalake (pre-authorization)

#### Type declaration:

* \[ **state**: *string*\]: boolean

___

###  tenantId

• **tenantId**: *string*

Defined in src/hub/hubhelper.ts:85

Requester Tenant ID

[@paloaltonetworks/pan-cortex-hub](../README.md) › [CortexHubHelper](cortexhubhelper.md)

# Class: CortexHubHelper <**T**>

Class with methods to help interfacing with the Cortex hub.

## Type parameters

▪ **T**: *object*

shape of the key value (custom developer fields) provided by
Cortex Hub

## Hierarchy

* **CortexHubHelper**

  ↳ [HubDebugger](hubdebugger.md)

## Index

### Constructors

* [constructor](cortexhubhelper.md#constructor)

### Properties

* [credProvider](cortexhubhelper.md#protected-credprovider)

### Methods

* [deleteDatalake](cortexhubhelper.md#deletedatalake)
* [getCredentialsObject](cortexhubhelper.md#getcredentialsobject)
* [getDatalake](cortexhubhelper.md#getdatalake)
* [hubParamsRegister](cortexhubhelper.md#hubparamsregister)
* [idpAuthCallback](cortexhubhelper.md#idpauthcallback)
* [idpAuthRequest](cortexhubhelper.md#idpauthrequest)
* [listActiveDatalake](cortexhubhelper.md#listactivedatalake)
* [listDatalake](cortexhubhelper.md#listdatalake)

## Constructors

###  constructor

\+ **new CortexHubHelper**(`idpCallbackUrl`: string, `credProv`: [CortexCredentialProvider](cortexcredentialprovider.md)‹[HubMetadata](../interfaces/hubmetadata.md)‹T››, `ops?`: [CortexHelperOptions](../interfaces/cortexhelperoptions.md)): *[CortexHubHelper](cortexhubhelper.md)*

*Defined in [src/hub/hubhelper.ts:131](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L131)*

Constructor method

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`idpCallbackUrl` | string | One of the URI's provided in the `auth_redirect_uris` field of the manifest file |
`credProv` | [CortexCredentialProvider](cortexcredentialprovider.md)‹[HubMetadata](../interfaces/hubmetadata.md)‹T›› | a `CortexCredentialProvider` instance that will be used by the `authCallbackHandler` to register new datalakes after activation |
`ops?` | [CortexHelperOptions](../interfaces/cortexhelperoptions.md) | class configuration options  |

**Returns:** *[CortexHubHelper](cortexhubhelper.md)*

## Properties

### `Protected` credProvider

• **credProvider**: *[CortexCredentialProvider](cortexcredentialprovider.md)‹[HubMetadata](../interfaces/hubmetadata.md)‹T››*

*Defined in [src/hub/hubhelper.ts:130](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L130)*

## Methods

###  deleteDatalake

▸ **deleteDatalake**(`tenantId`: string, `datalakeId`: string): *Promise‹void›*

*Defined in [src/hub/hubhelper.ts:340](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L340)*

Deletes a datalake metadata record

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tenantId` | string | requesting Tenant ID |
`datalakeId` | string | ID of the datalake  |

**Returns:** *Promise‹void›*

___

###  getCredentialsObject

▸ **getCredentialsObject**(`tenantId`: string, `datalakeId`: string): *Promise‹[Credentials](../interfaces/credentials.md)›*

*Defined in [src/hub/hubhelper.ts:350](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L350)*

Get a credentials object for this tenant data lake combination

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tenantId` | string | tenant identifier |
`datalakeId` | string | data lake identifier |

**Returns:** *Promise‹[Credentials](../interfaces/credentials.md)›*

a `Credentials` object valid for the provided identifiers

___

###  getDatalake

▸ **getDatalake**(`tenantId`: string, `datalakeId`: string): *Promise‹[CortexClientParams](../interfaces/cortexclientparams.md)‹T› | undefined›*

*Defined in [src/hub/hubhelper.ts:327](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L327)*

Gets metadata of a given Datalake ID as a `CortexClientParams` object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tenantId` | string | requesting Tenant ID |
`datalakeId` | string | ID of the Datalake |

**Returns:** *Promise‹[CortexClientParams](../interfaces/cortexclientparams.md)‹T› | undefined›*

the reported Cortex hub params for this data lake

___

###  hubParamsRegister

▸ **hubParamsRegister**(`params`: string, `tenantId`: string): *Promise‹[CortexClientParams](../interfaces/cortexclientparams.md)‹T››*

*Defined in [src/hub/hubhelper.ts:248](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L248)*

Parses the CortexHub BASE64 params string into a CortexClientParams object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`params` | string | Input string |
`tenantId` | string | the resulting client params will be registered in the CredentialsProvider store |

**Returns:** *Promise‹[CortexClientParams](../interfaces/cortexclientparams.md)‹T››*

the parsed object

___

###  idpAuthCallback

▸ **idpAuthCallback**(`code`: string, `stateId`: string, `tId`: string): *Promise‹[Credentials](../interfaces/credentials.md)›*

*Defined in [src/hub/hubhelper.ts:218](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L218)*

Completes the OAuth2 code grant flow and returns a valid Credentials
object for the just authorized datalake

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`code` | string | OAuth2 code value |
`stateId` | string | state value returned by the IDP service |
`tId` | string | tenant identifier |

**Returns:** *Promise‹[Credentials](../interfaces/credentials.md)›*

a valid Credentials object for this authorized data lake

___

###  idpAuthRequest

▸ **idpAuthRequest**(`tenantId`: string, `datalakeId`: string, `scope`: string[]): *Promise‹URL›*

*Defined in [src/hub/hubhelper.ts:185](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L185)*

Prepares an IDP authorization request

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tenantId` | string | Requesting Tenant ID (will be store in the authorization state) |
`datalakeId` | string | Datalake ID willing to activate (will be store in the authorization state) |
`scope` | string[] | OAUTH2 Data access Scope(s) |

**Returns:** *Promise‹URL›*

a URI ready to be consumed (typically to be used for a client 302 redirect)

___

###  listActiveDatalake

▸ **listActiveDatalake**(`tenantId`: string): *Promise‹string[]›*

*Defined in [src/hub/hubhelper.ts:314](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L314)*

Retrieve the list of data lake id's that has been successfully authorized
by the user

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tenantId` | string | requesting Tenant ID |

**Returns:** *Promise‹string[]›*

and array with all data lake id's owned by the provided tenant
identifier that contain secrets

___

###  listDatalake

▸ **listDatalake**(`tenantId`: string): *Promise‹object[]›*

*Defined in [src/hub/hubhelper.ts:300](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L300)*

Retrieves the list of datalakes registered under this tenant

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tenantId` | string | requesting Tenant ID |

**Returns:** *Promise‹object[]›*

an array with two columns: data lake id and params reported by
the Cortex hub

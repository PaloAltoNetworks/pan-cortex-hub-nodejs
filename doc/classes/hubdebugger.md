[@paloaltonetworks/pan-cortex-hub](../README.md) › [HubDebugger](hubdebugger.md)

# Class: HubDebugger

Convenience `CortexHubHelper` subclass for quick starting experiments with
Cortex hub. Use its static method `factory` to instantiate an object for this
class

## Hierarchy

* [CortexHubHelper](cortexhubhelper.md)‹never›

  ↳ **HubDebugger**

## Index

### Constructors

* [constructor](hubdebugger.md#constructor)

### Properties

* [credDebugger](hubdebugger.md#creddebugger)
* [credProvider](hubdebugger.md#protected-credprovider)

### Methods

* [deleteDatalake](hubdebugger.md#deletedatalake)
* [dumpDatabase](hubdebugger.md#dumpdatabase)
* [getCredentialsObject](hubdebugger.md#getcredentialsobject)
* [getDatalake](hubdebugger.md#getdatalake)
* [hubParamsRegister](hubdebugger.md#hubparamsregister)
* [idpAuthCallback](hubdebugger.md#idpauthcallback)
* [idpAuthRequest](hubdebugger.md#idpauthrequest)
* [listActiveDatalake](hubdebugger.md#listactivedatalake)
* [listDatalake](hubdebugger.md#listdatalake)
* [factory](hubdebugger.md#static-factory)

## Constructors

###  constructor

\+ **new HubDebugger**(`idpCallbackUrl`: string, `credProv`: [CortexCredentialProvider](cortexcredentialprovider.md)‹[HubMetadata](../interfaces/hubmetadata.md)‹never››, `ops?`: [CortexHelperOptions](../interfaces/cortexhelperoptions.md)): *[HubDebugger](hubdebugger.md)*

*Inherited from [CortexHubHelper](cortexhubhelper.md).[constructor](cortexhubhelper.md#constructor)*

*Defined in [src/hub/hubhelper.ts:131](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L131)*

Constructor method

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`idpCallbackUrl` | string | One of the URI's provided in the `auth_redirect_uris` field of the manifest file |
`credProv` | [CortexCredentialProvider](cortexcredentialprovider.md)‹[HubMetadata](../interfaces/hubmetadata.md)‹never›› | a `CortexCredentialProvider` instance that will be used by the `authCallbackHandler` to register new datalakes after activation |
`ops?` | [CortexHelperOptions](../interfaces/cortexhelperoptions.md) | class configuration options  |

**Returns:** *[HubDebugger](hubdebugger.md)*

## Properties

###  credDebugger

• **credDebugger**: *[CredentialsDebugger](credentialsdebugger.md)*

*Defined in [src/hub/hub_debugger.ts:74](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hub_debugger.ts#L74)*

___

### `Protected` credProvider

• **credProvider**: *[CortexCredentialProvider](cortexcredentialprovider.md)‹[HubMetadata](../interfaces/hubmetadata.md)‹never››*

*Inherited from [CortexHubHelper](cortexhubhelper.md).[credProvider](cortexhubhelper.md#protected-credprovider)*

*Defined in [src/hub/hubhelper.ts:130](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L130)*

## Methods

###  deleteDatalake

▸ **deleteDatalake**(`tenantId`: string, `datalakeId`: string): *Promise‹void›*

*Inherited from [CortexHubHelper](cortexhubhelper.md).[deleteDatalake](cortexhubhelper.md#deletedatalake)*

*Defined in [src/hub/hubhelper.ts:340](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L340)*

Deletes a datalake metadata record

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tenantId` | string | requesting Tenant ID |
`datalakeId` | string | ID of the datalake  |

**Returns:** *Promise‹void›*

___

###  dumpDatabase

▸ **dumpDatabase**(): *Promise‹string›*

*Defined in [src/hub/hub_debugger.ts:100](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hub_debugger.ts#L100)*

Dumps the internal CredentialsProvider store as a JSON document

**Returns:** *Promise‹string›*

___

###  getCredentialsObject

▸ **getCredentialsObject**(`tenantId`: string, `datalakeId`: string): *Promise‹[Credentials](../interfaces/credentials.md)›*

*Inherited from [CortexHubHelper](cortexhubhelper.md).[getCredentialsObject](cortexhubhelper.md#getcredentialsobject)*

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

▸ **getDatalake**(`tenantId`: string, `datalakeId`: string): *Promise‹[CortexClientParams](../interfaces/cortexclientparams.md)‹never› | undefined›*

*Inherited from [CortexHubHelper](cortexhubhelper.md).[getDatalake](cortexhubhelper.md#getdatalake)*

*Defined in [src/hub/hubhelper.ts:327](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L327)*

Gets metadata of a given Datalake ID as a `CortexClientParams` object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tenantId` | string | requesting Tenant ID |
`datalakeId` | string | ID of the Datalake |

**Returns:** *Promise‹[CortexClientParams](../interfaces/cortexclientparams.md)‹never› | undefined›*

the reported Cortex hub params for this data lake

___

###  hubParamsRegister

▸ **hubParamsRegister**(`params`: string, `tenantId`: string): *Promise‹[CortexClientParams](../interfaces/cortexclientparams.md)‹never››*

*Inherited from [CortexHubHelper](cortexhubhelper.md).[hubParamsRegister](cortexhubhelper.md#hubparamsregister)*

*Defined in [src/hub/hubhelper.ts:248](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L248)*

Parses the CortexHub BASE64 params string into a CortexClientParams object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`params` | string | Input string |
`tenantId` | string | the resulting client params will be registered in the CredentialsProvider store |

**Returns:** *Promise‹[CortexClientParams](../interfaces/cortexclientparams.md)‹never››*

the parsed object

___

###  idpAuthCallback

▸ **idpAuthCallback**(`code`: string, `stateId`: string, `tId`: string): *Promise‹[Credentials](../interfaces/credentials.md)›*

*Inherited from [CortexHubHelper](cortexhubhelper.md).[idpAuthCallback](cortexhubhelper.md#idpauthcallback)*

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

*Inherited from [CortexHubHelper](cortexhubhelper.md).[idpAuthRequest](cortexhubhelper.md#idpauthrequest)*

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

*Inherited from [CortexHubHelper](cortexhubhelper.md).[listActiveDatalake](cortexhubhelper.md#listactivedatalake)*

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

*Inherited from [CortexHubHelper](cortexhubhelper.md).[listDatalake](cortexhubhelper.md#listdatalake)*

*Defined in [src/hub/hubhelper.ts:300](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hubhelper.ts#L300)*

Retrieves the list of datalakes registered under this tenant

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tenantId` | string | requesting Tenant ID |

**Returns:** *Promise‹object[]›*

an array with two columns: data lake id and params reported by
the Cortex hub

___

### `Static` factory

▸ **factory**(`idpCallbackUrl`: string, `ops?`: [CredentialProviderOptions](../interfaces/credentialprovideroptions.md) & [CortexHelperOptions](../interfaces/cortexhelperoptions.md) & object): *[HubDebugger](hubdebugger.md)*

*Defined in [src/hub/hub_debugger.ts:89](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/hub_debugger.ts#L89)*

Convenience method to instantiate `HubDebugger` objects

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`idpCallbackUrl` | string | its must be equal to one of the entries in the `auth_redirect_uris` array in the manifest file provided to publish the application in the Cortex hub |
`ops?` | [CredentialProviderOptions](../interfaces/credentialprovideroptions.md) & [CortexHelperOptions](../interfaces/cortexhelperoptions.md) & object | configuration options for its parent classes |

**Returns:** *[HubDebugger](hubdebugger.md)*

an instantiated `HubDebugger` object

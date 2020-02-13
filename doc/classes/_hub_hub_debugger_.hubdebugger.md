[pan-cortex-hub](../README.md) › ["hub/hub_debugger"](../modules/_hub_hub_debugger_.md) › [HubDebugger](_hub_hub_debugger_.hubdebugger.md)

# Class: HubDebugger

Convenience `CortexHubHelper` subclass for quick starting experiments with
Cortex hub. Use its static method `factory` to instantiate an object for this
class

## Hierarchy

* [CortexHubHelper](_hub_hubhelper_.cortexhubhelper.md)‹never›

  ↳ **HubDebugger**

## Index

### Constructors

* [constructor](_hub_hub_debugger_.hubdebugger.md#constructor)

### Properties

* [credDebugger](_hub_hub_debugger_.hubdebugger.md#creddebugger)
* [credProvider](_hub_hub_debugger_.hubdebugger.md#protected-credprovider)

### Methods

* [deleteDatalake](_hub_hub_debugger_.hubdebugger.md#deletedatalake)
* [dumpDatabase](_hub_hub_debugger_.hubdebugger.md#dumpdatabase)
* [getCredentialsObject](_hub_hub_debugger_.hubdebugger.md#getcredentialsobject)
* [getDatalake](_hub_hub_debugger_.hubdebugger.md#getdatalake)
* [hubParamsRegister](_hub_hub_debugger_.hubdebugger.md#hubparamsregister)
* [idpAuthCallback](_hub_hub_debugger_.hubdebugger.md#idpauthcallback)
* [idpAuthRequest](_hub_hub_debugger_.hubdebugger.md#idpauthrequest)
* [listActiveDatalake](_hub_hub_debugger_.hubdebugger.md#listactivedatalake)
* [listDatalake](_hub_hub_debugger_.hubdebugger.md#listdatalake)
* [factory](_hub_hub_debugger_.hubdebugger.md#static-factory)

## Constructors

###  constructor

\+ **new HubDebugger**(`idpCallbackUrl`: string, `credProv`: [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md)‹[HubMetadata](../interfaces/_hub_hubhelper_.hubmetadata.md)‹never››, `ops?`: [CortexHelperOptions](../interfaces/_hub_hubhelper_.cortexhelperoptions.md)): *[HubDebugger](_hub_hub_debugger_.hubdebugger.md)*

*Inherited from [CortexHubHelper](_hub_hubhelper_.cortexhubhelper.md).[constructor](_hub_hubhelper_.cortexhubhelper.md#constructor)*

Defined in src/hub/hubhelper.ts:131

Constructor method

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`idpCallbackUrl` | string | One of the URI's provided in the `auth_redirect_uris` field of the manifest file |
`credProv` | [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md)‹[HubMetadata](../interfaces/_hub_hubhelper_.hubmetadata.md)‹never›› | a `CortexCredentialProvider` instance that will be used by the `authCallbackHandler` to register new datalakes after activation |
`ops?` | [CortexHelperOptions](../interfaces/_hub_hubhelper_.cortexhelperoptions.md) | class configuration options  |

**Returns:** *[HubDebugger](_hub_hub_debugger_.hubdebugger.md)*

## Properties

###  credDebugger

• **credDebugger**: *CredentialsDebugger*

Defined in src/hub/hub_debugger.ts:74

___

### `Protected` credProvider

• **credProvider**: *[CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md)‹[HubMetadata](../interfaces/_hub_hubhelper_.hubmetadata.md)‹never››*

*Inherited from [CortexHubHelper](_hub_hubhelper_.cortexhubhelper.md).[credProvider](_hub_hubhelper_.cortexhubhelper.md#protected-credprovider)*

Defined in src/hub/hubhelper.ts:130

## Methods

###  deleteDatalake

▸ **deleteDatalake**(`tenantId`: string, `datalakeId`: string): *Promise‹void›*

*Inherited from [CortexHubHelper](_hub_hubhelper_.cortexhubhelper.md).[deleteDatalake](_hub_hubhelper_.cortexhubhelper.md#deletedatalake)*

Defined in src/hub/hubhelper.ts:340

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

Defined in src/hub/hub_debugger.ts:100

Dumps the internal CredentialsProvider store as a JSON document

**Returns:** *Promise‹string›*

___

###  getCredentialsObject

▸ **getCredentialsObject**(`tenantId`: string, `datalakeId`: string): *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

*Inherited from [CortexHubHelper](_hub_hubhelper_.cortexhubhelper.md).[getCredentialsObject](_hub_hubhelper_.cortexhubhelper.md#getcredentialsobject)*

Defined in src/hub/hubhelper.ts:350

Get a credentials object for this tenant data lake combination

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tenantId` | string | tenant identifier |
`datalakeId` | string | data lake identifier |

**Returns:** *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

a `Credentials` object valid for the provided identifiers

___

###  getDatalake

▸ **getDatalake**(`tenantId`: string, `datalakeId`: string): *Promise‹[CortexClientParams](../interfaces/_hub_hubhelper_.cortexclientparams.md)‹never› | undefined›*

*Inherited from [CortexHubHelper](_hub_hubhelper_.cortexhubhelper.md).[getDatalake](_hub_hubhelper_.cortexhubhelper.md#getdatalake)*

Defined in src/hub/hubhelper.ts:327

Gets metadata of a given Datalake ID as a `CortexClientParams` object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tenantId` | string | requesting Tenant ID |
`datalakeId` | string | ID of the Datalake |

**Returns:** *Promise‹[CortexClientParams](../interfaces/_hub_hubhelper_.cortexclientparams.md)‹never› | undefined›*

the reported Cortex hub params for this data lake

___

###  hubParamsRegister

▸ **hubParamsRegister**(`params`: string, `tenantId`: string): *Promise‹[CortexClientParams](../interfaces/_hub_hubhelper_.cortexclientparams.md)‹never››*

*Inherited from [CortexHubHelper](_hub_hubhelper_.cortexhubhelper.md).[hubParamsRegister](_hub_hubhelper_.cortexhubhelper.md#hubparamsregister)*

Defined in src/hub/hubhelper.ts:248

Parses the CortexHub BASE64 params string into a CortexClientParams object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`params` | string | Input string |
`tenantId` | string | the resulting client params will be registered in the CredentialsProvider store |

**Returns:** *Promise‹[CortexClientParams](../interfaces/_hub_hubhelper_.cortexclientparams.md)‹never››*

the parsed object

___

###  idpAuthCallback

▸ **idpAuthCallback**(`code`: string, `stateId`: string, `tId`: string): *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

*Inherited from [CortexHubHelper](_hub_hubhelper_.cortexhubhelper.md).[idpAuthCallback](_hub_hubhelper_.cortexhubhelper.md#idpauthcallback)*

Defined in src/hub/hubhelper.ts:218

Completes the OAuth2 code grant flow and returns a valid Credentials
object for the just authorized datalake

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`code` | string | OAuth2 code value |
`stateId` | string | state value returned by the IDP service |
`tId` | string | tenant identifier |

**Returns:** *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

a valid Credentials object for this authorized data lake

___

###  idpAuthRequest

▸ **idpAuthRequest**(`tenantId`: string, `datalakeId`: string, `scope`: string[]): *Promise‹URL›*

*Inherited from [CortexHubHelper](_hub_hubhelper_.cortexhubhelper.md).[idpAuthRequest](_hub_hubhelper_.cortexhubhelper.md#idpauthrequest)*

Defined in src/hub/hubhelper.ts:185

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

*Inherited from [CortexHubHelper](_hub_hubhelper_.cortexhubhelper.md).[listActiveDatalake](_hub_hubhelper_.cortexhubhelper.md#listactivedatalake)*

Defined in src/hub/hubhelper.ts:314

Retrieve the list of data lake id's that has been successfully authorized
by the user

**Parameters:**

Name | Type |
------ | ------ |
`tenantId` | string |

**Returns:** *Promise‹string[]›*

and array with all data lake id's owned by the provided tenant
identifier that contain secrets

___

###  listDatalake

▸ **listDatalake**(`tenantId`: string): *Promise‹object[]›*

*Inherited from [CortexHubHelper](_hub_hubhelper_.cortexhubhelper.md).[listDatalake](_hub_hubhelper_.cortexhubhelper.md#listdatalake)*

Defined in src/hub/hubhelper.ts:300

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

▸ **factory**(`idpCallbackUrl`: string, `ops?`: [CredentialProviderOptions](../interfaces/_hub_credentials_provider_.credentialprovideroptions.md) & [CortexHelperOptions](../interfaces/_hub_hubhelper_.cortexhelperoptions.md) & object): *[HubDebugger](_hub_hub_debugger_.hubdebugger.md)*

Defined in src/hub/hub_debugger.ts:89

Convenience method to instantiate `HubDebugger` objects

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`idpCallbackUrl` | string | its must be equal to one of the entries in the `auth_redirect_uris` array in the manifest file provided to publish the application in the Cortex hub |
`ops?` | [CredentialProviderOptions](../interfaces/_hub_credentials_provider_.credentialprovideroptions.md) & [CortexHelperOptions](../interfaces/_hub_hubhelper_.cortexhelperoptions.md) & object | configuration options for its parent classes |

**Returns:** *[HubDebugger](_hub_hub_debugger_.hubdebugger.md)*

an instantiated `HubDebugger` object

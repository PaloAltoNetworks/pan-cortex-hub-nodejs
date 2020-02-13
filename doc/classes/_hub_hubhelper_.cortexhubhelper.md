[pan-cortex-hub](../README.md) › ["hub/hubhelper"](../modules/_hub_hubhelper_.md) › [CortexHubHelper](_hub_hubhelper_.cortexhubhelper.md)

# Class: CortexHubHelper <**T**>

Class with methods to help interfacing with the Cortex hub.

## Type parameters

▪ **T**: *object*

shape of the key value (custom developer fields) provided by
Cortex Hub

## Hierarchy

* **CortexHubHelper**

  ↳ [HubDebugger](_hub_hub_debugger_.hubdebugger.md)

## Index

### Constructors

* [constructor](_hub_hubhelper_.cortexhubhelper.md#constructor)

### Properties

* [credProvider](_hub_hubhelper_.cortexhubhelper.md#protected-credprovider)

### Methods

* [deleteDatalake](_hub_hubhelper_.cortexhubhelper.md#deletedatalake)
* [getCredentialsObject](_hub_hubhelper_.cortexhubhelper.md#getcredentialsobject)
* [getDatalake](_hub_hubhelper_.cortexhubhelper.md#getdatalake)
* [hubParamsRegister](_hub_hubhelper_.cortexhubhelper.md#hubparamsregister)
* [idpAuthCallback](_hub_hubhelper_.cortexhubhelper.md#idpauthcallback)
* [idpAuthRequest](_hub_hubhelper_.cortexhubhelper.md#idpauthrequest)
* [listActiveDatalake](_hub_hubhelper_.cortexhubhelper.md#listactivedatalake)
* [listDatalake](_hub_hubhelper_.cortexhubhelper.md#listdatalake)

## Constructors

###  constructor

\+ **new CortexHubHelper**(`idpCallbackUrl`: string, `credProv`: [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md)‹[HubMetadata](../interfaces/_hub_hubhelper_.hubmetadata.md)‹T››, `ops?`: [CortexHelperOptions](../interfaces/_hub_hubhelper_.cortexhelperoptions.md)): *[CortexHubHelper](_hub_hubhelper_.cortexhubhelper.md)*

Defined in src/hub/hubhelper.ts:131

Constructor method

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`idpCallbackUrl` | string | One of the URI's provided in the `auth_redirect_uris` field of the manifest file |
`credProv` | [CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md)‹[HubMetadata](../interfaces/_hub_hubhelper_.hubmetadata.md)‹T›› | a `CortexCredentialProvider` instance that will be used by the `authCallbackHandler` to register new datalakes after activation |
`ops?` | [CortexHelperOptions](../interfaces/_hub_hubhelper_.cortexhelperoptions.md) | class configuration options  |

**Returns:** *[CortexHubHelper](_hub_hubhelper_.cortexhubhelper.md)*

## Properties

### `Protected` credProvider

• **credProvider**: *[CortexCredentialProvider](_hub_credentials_provider_.cortexcredentialprovider.md)‹[HubMetadata](../interfaces/_hub_hubhelper_.hubmetadata.md)‹T››*

Defined in src/hub/hubhelper.ts:130

## Methods

###  deleteDatalake

▸ **deleteDatalake**(`tenantId`: string, `datalakeId`: string): *Promise‹void›*

Defined in src/hub/hubhelper.ts:340

Deletes a datalake metadata record

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tenantId` | string | requesting Tenant ID |
`datalakeId` | string | ID of the datalake  |

**Returns:** *Promise‹void›*

___

###  getCredentialsObject

▸ **getCredentialsObject**(`tenantId`: string, `datalakeId`: string): *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

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

▸ **getDatalake**(`tenantId`: string, `datalakeId`: string): *Promise‹[CortexClientParams](../interfaces/_hub_hubhelper_.cortexclientparams.md)‹T› | undefined›*

Defined in src/hub/hubhelper.ts:327

Gets metadata of a given Datalake ID as a `CortexClientParams` object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tenantId` | string | requesting Tenant ID |
`datalakeId` | string | ID of the Datalake |

**Returns:** *Promise‹[CortexClientParams](../interfaces/_hub_hubhelper_.cortexclientparams.md)‹T› | undefined›*

the reported Cortex hub params for this data lake

___

###  hubParamsRegister

▸ **hubParamsRegister**(`params`: string, `tenantId`: string): *Promise‹[CortexClientParams](../interfaces/_hub_hubhelper_.cortexclientparams.md)‹T››*

Defined in src/hub/hubhelper.ts:248

Parses the CortexHub BASE64 params string into a CortexClientParams object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`params` | string | Input string |
`tenantId` | string | the resulting client params will be registered in the CredentialsProvider store |

**Returns:** *Promise‹[CortexClientParams](../interfaces/_hub_hubhelper_.cortexclientparams.md)‹T››*

the parsed object

___

###  idpAuthCallback

▸ **idpAuthCallback**(`code`: string, `stateId`: string, `tId`: string): *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

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

Defined in src/hub/hubhelper.ts:300

Retrieves the list of datalakes registered under this tenant

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tenantId` | string | requesting Tenant ID |

**Returns:** *Promise‹object[]›*

an array with two columns: data lake id and params reported by
the Cortex hub

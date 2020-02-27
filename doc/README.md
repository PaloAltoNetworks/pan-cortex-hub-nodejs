[@paloaltonetworks/pan-cortex-hub](README.md)

# @paloaltonetworks/pan-cortex-hub

## Index

### Enumerations

* [ErrorTypes](enums/errortypes.md)
* [logLevel](enums/loglevel.md)

### Classes

* [CortexCredentialProvider](classes/cortexcredentialprovider.md)
* [CortexHubHelper](classes/cortexhubhelper.md)
* [CredentialsBase](classes/credentialsbase.md)
* [CredentialsDebugger](classes/credentialsdebugger.md)
* [DevTokenCredentials](classes/devtokencredentials.md)
* [ErrorTools](classes/errortools.md)
* [FetchResponse](classes/fetchresponse.md)
* [FsCredProvider](classes/fscredprovider.md)
* [HubDebugger](classes/hubdebugger.md)
* [HubError](classes/huberror.md)
* [SdkError](classes/sdkerror.md)
* [SimpleCredentialsProvider](classes/simplecredentialsprovider.md)
* [StaticCredentials](classes/staticcredentials.md)

### Interfaces

* [CortexClientParams](interfaces/cortexclientparams.md)
* [CortexHelperOptions](interfaces/cortexhelperoptions.md)
* [CredentialProviderOptions](interfaces/credentialprovideroptions.md)
* [Credentials](interfaces/credentials.md)
* [CredentialsItem](interfaces/credentialsitem.md)
* [DevTokenCredentialsOptions](interfaces/devtokencredentialsoptions.md)
* [DevTokenSrvResponse](interfaces/devtokensrvresponse.md)
* [FetchOptions](interfaces/fetchoptions.md)
* [FsCredProviderOptions](interfaces/fscredprovideroptions.md)
* [HubMetadata](interfaces/hubmetadata.md)
* [IdpErrorResponse](interfaces/idperrorresponse.md)
* [IdpResponse](interfaces/idpresponse.md)
* [SecretsStorage](interfaces/secretsstorage.md)
* [StoreItem](interfaces/storeitem.md)

### Type aliases

* [AugmentedIdpResponse](README.md#augmentedidpresponse)
* [ConfigFile](README.md#configfile)
* [HttpMethod](README.md#httpmethod)

### Variables

* [ACCESS_GUARD](README.md#const-access_guard)
* [APIEPMAP](README.md#apiepmap)
* [CONFIG_FILE](README.md#const-config_file)
* [DEV_TOKEN_PROVIDER](README.md#dev_token_provider)
* [ENV_CLIENT_ID](README.md#const-env_client_id)
* [ENV_CLIENT_SECRET](README.md#const-env_client_secret)
* [ENV_DEVELOPER_TOKEN](README.md#const-env_developer_token)
* [ENV_DEVELOPER_TOKEN_PROVIDER](README.md#const-env_developer_token_provider)
* [ENV_SECRET](README.md#const-env_secret)
* [EUFQDN](README.md#const-eufqdn)
* [IDP_AUTH_URL](README.md#idp_auth_url)
* [IDP_REVOKE_URL](README.md#idp_revoke_url)
* [IDP_TOKEN_URL](README.md#idp_token_url)
* [PAN_CLIENT_ID](README.md#const-pan_client_id)
* [PAN_CLIENT_SECRET](README.md#const-pan_client_secret)
* [PAN_ENTRYPOINT](README.md#const-pan_entrypoint)
* [PAN_REFRESH_TOKEN](README.md#const-pan_refresh_token)
* [USFQDN](README.md#const-usfqdn)
* [currentLogLevel](README.md#let-currentloglevel)
* [envLevel](README.md#const-envlevel)
* [logFunc](README.md#const-logfunc)
* [seqno](README.md#let-seqno)

### Functions

* [autoCredentials](README.md#autocredentials)
* [commonLogger](README.md#commonlogger)
* [cortexCredentialsProviderFactory](README.md#cortexcredentialsproviderfactory)
* [expTokenExtractor](README.md#exptokenextractor)
* [fetch](README.md#fetch)
* [isConfigFile](README.md#isconfigfile)
* [isCortexClientParams](README.md#iscortexclientparams)
* [isCredentialItem](README.md#iscredentialitem)
* [isDevTokenSrvResponse](README.md#isdevtokensrvresponse)
* [isHubMetadata](README.md#ishubmetadata)
* [isIdpErrorResponse](README.md#isidperrorresponse)
* [parseIdpResponse](README.md#parseidpresponse)
* [passIvGenerator](README.md#passivgenerator)
* [promifyFs](README.md#promifyfs)
* [setLogLevel](README.md#setloglevel)
* [uuid](README.md#uuid)

### Object literals

* [cortexConstants](README.md#const-cortexconstants)
* [statusTextDict](README.md#const-statustextdict)

## Type aliases

###  AugmentedIdpResponse

Ƭ **AugmentedIdpResponse**: *[IdpResponse](interfaces/idpresponse.md) & object*

*Defined in [src/hub/credentials_provider.ts:45](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L45)*

Cortex credential set with additional `validUntil` field

___

###  ConfigFile

Ƭ **ConfigFile**: *object*

*Defined in [src/hub/credentials_provider_fs.ts:27](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider_fs.ts#L27)*

#### Type declaration:

* \[ **dlid**: *string*\]: [StoreItem](interfaces/storeitem.md)‹T›

___

###  HttpMethod

Ƭ **HttpMethod**: *"GET" | "POST" | "PUT" | "DELETE"*

*Defined in [src/fetch.ts:22](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L22)*

Supported HTTP methods

## Variables

### `Const` ACCESS_GUARD

• **ACCESS_GUARD**: *300* = 300

*Defined in [src/hub/credentials_provider.ts:21](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L21)*

___

###  APIEPMAP

• **APIEPMAP**: *object*

*Defined in [src/hub/credentials_devtoken.ts:24](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_devtoken.ts#L24)*

*Defined in [src/hub/credentials_provider_simple.ts:22](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider_simple.ts#L22)*

*Defined in [src/hub/hubhelper.ts:22](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/hubhelper.ts#L22)*

*Defined in [src/hub/autocredentials.ts:24](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/autocredentials.ts#L24)*

#### Type declaration:

* **americas**: *string* = USFQDN

* **europe**: *string* = EUFQDN

___

### `Const` CONFIG_FILE

• **CONFIG_FILE**: *"PANCLOUD_CONFIG.json"* = "PANCLOUD_CONFIG.json"

*Defined in [src/hub/credentials_provider_fs.ts:25](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider_fs.ts#L25)*

___

###  DEV_TOKEN_PROVIDER

• **DEV_TOKEN_PROVIDER**: *string*

*Defined in [src/hub/credentials_devtoken.ts:24](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_devtoken.ts#L24)*

___

### `Const` ENV_CLIENT_ID

• **ENV_CLIENT_ID**: *"PAN_CLIENT_ID"* = "PAN_CLIENT_ID"

*Defined in [src/hub/credentials_provider_fs.ts:22](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider_fs.ts#L22)*

*Defined in [src/hub/hub_debugger.ts:20](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/hub_debugger.ts#L20)*

___

### `Const` ENV_CLIENT_SECRET

• **ENV_CLIENT_SECRET**: *"PAN_CLIENT_SECRET"* = "PAN_CLIENT_SECRET"

*Defined in [src/hub/credentials_provider_fs.ts:23](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider_fs.ts#L23)*

*Defined in [src/hub/hub_debugger.ts:21](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/hub_debugger.ts#L21)*

___

### `Const` ENV_DEVELOPER_TOKEN

• **ENV_DEVELOPER_TOKEN**: *"PAN_DEVELOPER_TOKEN"* = "PAN_DEVELOPER_TOKEN"

*Defined in [src/hub/credentials_devtoken.ts:22](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_devtoken.ts#L22)*

___

### `Const` ENV_DEVELOPER_TOKEN_PROVIDER

• **ENV_DEVELOPER_TOKEN_PROVIDER**: *"PAN_DEVELOPER_TOKEN_PROVIDER"* = "PAN_DEVELOPER_TOKEN_PROVIDER"

*Defined in [src/hub/credentials_devtoken.ts:23](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_devtoken.ts#L23)*

___

### `Const` ENV_SECRET

• **ENV_SECRET**: *"PAN_SECRET"* = "PAN_SECRET"

*Defined in [src/hub/credentials_provider_fs.ts:24](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider_fs.ts#L24)*

___

### `Const` EUFQDN

• **EUFQDN**: *"api.nl.cdl.paloaltonetworks.com"* = "api.nl.cdl.paloaltonetworks.com"

*Defined in [src/constants.ts:14](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/constants.ts#L14)*

___

###  IDP_AUTH_URL

• **IDP_AUTH_URL**: *string*

*Defined in [src/hub/hubhelper.ts:22](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/hubhelper.ts#L22)*

___

###  IDP_REVOKE_URL

• **IDP_REVOKE_URL**: *string*

*Defined in [src/hub/credentials_provider.ts:22](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L22)*

___

###  IDP_TOKEN_URL

• **IDP_TOKEN_URL**: *string*

*Defined in [src/hub/credentials_provider.ts:22](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L22)*

___

### `Const` PAN_CLIENT_ID

• **PAN_CLIENT_ID**: *"PAN_CLIENT_ID"* = "PAN_CLIENT_ID"

*Defined in [src/hub/credentials_provider_simple.ts:23](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider_simple.ts#L23)*

___

### `Const` PAN_CLIENT_SECRET

• **PAN_CLIENT_SECRET**: *"PAN_CLIENT_SECRET"* = "PAN_CLIENT_SECRET"

*Defined in [src/hub/credentials_provider_simple.ts:24](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider_simple.ts#L24)*

___

### `Const` PAN_ENTRYPOINT

• **PAN_ENTRYPOINT**: *"PAN_ENTRYPOINT"* = "PAN_ENTRYPOINT"

*Defined in [src/hub/credentials_provider_simple.ts:26](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider_simple.ts#L26)*

___

### `Const` PAN_REFRESH_TOKEN

• **PAN_REFRESH_TOKEN**: *"PAN_REFRESH_TOKEN"* = "PAN_REFRESH_TOKEN"

*Defined in [src/hub/credentials_provider_simple.ts:25](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider_simple.ts#L25)*

___

### `Const` USFQDN

• **USFQDN**: *"cortex-prd1-api.us.cdl.paloaltonetworks.com"* = "cortex-prd1-api.us.cdl.paloaltonetworks.com"

*Defined in [src/constants.ts:16](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/constants.ts#L16)*

___

### `Let` currentLogLevel

• **currentLogLevel**: *[logLevel](enums/loglevel.md)* = (isNaN(envLevel) && logLevel.INFO) || envLevel

*Defined in [src/commonlogger.ts:27](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/commonlogger.ts#L27)*

___

### `Const` envLevel

• **envLevel**: *number* = Number.parseInt(process.env['CORTEX_SDK_LOG'] || '', 10)

*Defined in [src/commonlogger.ts:26](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/commonlogger.ts#L26)*

___

### `Const` logFunc

• **logFunc**: *debug[]* = [console.debug, console.info, console.warn, console.error]

*Defined in [src/commonlogger.ts:28](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/commonlogger.ts#L28)*

___

### `Let` seqno

• **seqno**: *number* = Math.floor(Math.random() * 10000)

*Defined in [src/fetch.ts:34](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L34)*

## Functions

###  autoCredentials

▸ **autoCredentials**(`opt?`: [CredentialProviderOptions](interfaces/credentialprovideroptions.md) & [DevTokenCredentialsOptions](interfaces/devtokencredentialsoptions.md) & object): *Promise‹[Credentials](interfaces/credentials.md)›*

*Defined in [src/hub/autocredentials.ts:39](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/autocredentials.ts#L39)*

Convenience function for getting started that will do its best to build a
Credentials object for you. It will use either values provided in the optiona
`opt` parameter or environmental variables equivalents and attempt, in order:
- `DevTokenCredentials` class (PAN_DEVELOPER_TOKEN env variable found)
- `SimpleCredentialsProvider` class (PAN_CLIENT_ID & PAN_CLIENT_SECRET &
  PAN_REFRESH_TOKEN env variables found)
- `StaticCredentials` class (PAN_ACCESS_TOKEN env variable found)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`opt?` | [CredentialProviderOptions](interfaces/credentialprovideroptions.md) & [DevTokenCredentialsOptions](interfaces/devtokencredentialsoptions.md) & object | any option from CredentialProviderOptions or DevTokenCredentialsOptions plus optional explicits values for `accessToken`, `refreshToken` and `entryPoint` |

**Returns:** *Promise‹[Credentials](interfaces/credentials.md)›*

a valid `Credentials` object for the identificators provided

___

###  commonLogger

▸ **commonLogger**(`error`: [Error](classes/sdkerror.md#static-error)): *void*

*Defined in [src/commonlogger.ts:34](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/commonlogger.ts#L34)*

logs an error object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`error` | [Error](classes/sdkerror.md#static-error) | object to be logged  |

**Returns:** *void*

▸ **commonLogger**(`level`: [logLevel](enums/loglevel.md), `message`: string, `noPrefix?`: undefined | false | true): *void*

*Defined in [src/commonlogger.ts:41](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/commonlogger.ts#L41)*

logs a message string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`level` | [logLevel](enums/loglevel.md) | level of the message |
`message` | string | the error message |
`noPrefix?` | undefined &#124; false &#124; true | to remove the 'CORTEX_SDK' prefix in the output  |

**Returns:** *void*

___

###  cortexCredentialsProviderFactory

▸ **cortexCredentialsProviderFactory**<**T**>(`ops`: [CredentialProviderOptions](interfaces/credentialprovideroptions.md) & object, `storage`: [SecretsStorage](interfaces/secretsstorage.md)‹T›): *[CortexCredentialProvider](classes/cortexcredentialprovider.md)‹T›*

*Defined in [src/hub/credentials_provider.ts:596](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L596)*

Buils a CortexCredentialsObject from provided options and storage object

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ops` | [CredentialProviderOptions](interfaces/credentialprovideroptions.md) & object | configuration options |
`storage` | [SecretsStorage](interfaces/secretsstorage.md)‹T› | object implementing the secrets storage interface |

**Returns:** *[CortexCredentialProvider](classes/cortexcredentialprovider.md)‹T›*

an instantiated CortexCredentialsProvider object

___

###  expTokenExtractor

▸ **expTokenExtractor**(`token`: string): *number*

*Defined in [src/hub/utils.ts:17](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/utils.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`token` | string |

**Returns:** *number*

___

###  fetch

▸ **fetch**(`url`: string, `ops`: [FetchOptions](interfaces/fetchoptions.md)): *Promise‹[FetchResponse](classes/fetchresponse.md)›*

*Defined in [src/fetch.ts:85](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L85)*

convenience method to perform a HTTP request

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`url` | string | url of the endpoint |
`ops` | [FetchOptions](interfaces/fetchoptions.md) | configuration options for the request |

**Returns:** *Promise‹[FetchResponse](classes/fetchresponse.md)›*

the request response

___

###  isConfigFile

▸ **isConfigFile**<**T**>(`obj`: any): *obj is ConfigFile<T>*

*Defined in [src/hub/credentials_provider_fs.ts:29](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider_fs.ts#L29)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *obj is ConfigFile<T>*

___

###  isCortexClientParams

▸ **isCortexClientParams**<**T**>(`obj`: any): *obj is CortexClientParams<T>*

*Defined in [src/hub/hubhelper.ts:69](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/hubhelper.ts#L69)*

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

###  isCredentialItem

▸ **isCredentialItem**(`obj`: any): *obj is CredentialsItem*

*Defined in [src/hub/credentials_provider.ts:118](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L118)*

Conveniente type guard to check an object against the `CredentialsItem` interface

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`obj` | any | object to check  |

**Returns:** *obj is CredentialsItem*

___

###  isDevTokenSrvResponse

▸ **isDevTokenSrvResponse**(`obj`: any): *obj is DevTokenSrvResponse*

*Defined in [src/hub/credentials_devtoken.ts:36](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_devtoken.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *obj is DevTokenSrvResponse*

___

###  isHubMetadata

▸ **isHubMetadata**(`obj`: any): *obj is HubMetadata<never>*

*Defined in [src/hub/hubhelper.ts:104](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/hubhelper.ts#L104)*

Convenience type guard function to check if an object is a valid HubMetadata type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`obj` | any | object to be checked  |

**Returns:** *obj is HubMetadata<never>*

___

###  isIdpErrorResponse

▸ **isIdpErrorResponse**(`obj`: any): *obj is IdpErrorResponse*

*Defined in [src/hub/credentials_provider.ts:125](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L125)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *obj is IdpErrorResponse*

___

###  parseIdpResponse

▸ **parseIdpResponse**(`obj`: any): *[AugmentedIdpResponse](README.md#augmentedidpresponse)*

*Defined in [src/hub/credentials_provider.ts:52](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *[AugmentedIdpResponse](README.md#augmentedidpresponse)*

___

###  passIvGenerator

▸ **passIvGenerator**(`secret`: string): *object*

*Defined in [src/hub/credentials_provider_fs.ts:190](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider_fs.ts#L190)*

**Parameters:**

Name | Type |
------ | ------ |
`secret` | string |

**Returns:** *object*

* **iv**: *Buffer*

* **key**: *Buffer*

___

###  promifyFs

▸ **promifyFs**<**T**>(`f`: function, ...`params`: any[]): *Promise‹T›*

*Defined in [src/hub/credentials_provider_fs.ts:200](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/credentials_provider_fs.ts#L200)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **f**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

▪... **params**: *any[]*

**Returns:** *Promise‹T›*

___

###  setLogLevel

▸ **setLogLevel**(`level`: [logLevel](enums/loglevel.md)): *void*

*Defined in [src/commonlogger.ts:63](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/commonlogger.ts#L63)*

Change the log level of the common logger at runtime

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`level` | [logLevel](enums/loglevel.md) |   |

**Returns:** *void*

___

###  uuid

▸ **uuid**(`content`: string): *string*

*Defined in [src/hub/utils.ts:45](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/hub/utils.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`content` | string |

**Returns:** *string*

## Object literals

### `Const` cortexConstants

### ▪ **cortexConstants**: *object*

*Defined in [src/constants.ts:21](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/constants.ts#L21)*

Cortex constants

###  DEV_TOKEN_PROVIDER

• **DEV_TOKEN_PROVIDER**: *string* = "https://app.developers.paloaltonetworks.com/request_token"

*Defined in [src/constants.ts:56](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/constants.ts#L56)*

URL of the Palo Alto Networks Developers Relations developer token service

###  IDP_AUTH_URL

• **IDP_AUTH_URL**: *string* = "https://identity.paloaltonetworks.com/as/authorization.oauth2"

*Defined in [src/constants.ts:52](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/constants.ts#L52)*

Identity provider URL for token operations

###  IDP_REVOKE_URL

• **IDP_REVOKE_URL**: *string* = "https://api.paloaltonetworks.com/api/oauth2/RevokeToken"

*Defined in [src/constants.ts:48](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/constants.ts#L48)*

Identity provider URL for token revoke operations

###  IDP_TOKEN_URL

• **IDP_TOKEN_URL**: *string* = "https://api.paloaltonetworks.com/api/oauth2/RequestToken"

*Defined in [src/constants.ts:44](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/constants.ts#L44)*

Identity provider URL for authentication requests

▪ **APIEPMAP**: *object*

*Defined in [src/constants.ts:25](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/constants.ts#L25)*

Map that links Cortex Data Lake regions with their corresponding FQDNs

* **americas**: *string* = USFQDN

* **europe**: *string* = EUFQDN

▪ **OAUTH2SCOPEMAP**: *object*

*Defined in [src/constants.ts:38](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/constants.ts#L38)*

OAuth2 Identity Provider scopes for the Cortex Data Lake

* **ls_read**: *string* = "logging-service:read"

___

### `Const` statusTextDict

### ▪ **statusTextDict**: *object*

*Defined in [src/fetch.ts:36](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L36)*

###  200

• **200**: *string* = "200 OK"

*Defined in [src/fetch.ts:37](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L37)*

###  300

• **300**: *string* = "301 Moved Permanently"

*Defined in [src/fetch.ts:38](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L38)*

###  302

• **302**: *string* = "302 Found"

*Defined in [src/fetch.ts:39](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L39)*

###  303

• **303**: *string* = "303 See Other"

*Defined in [src/fetch.ts:40](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L40)*

###  304

• **304**: *string* = "304 Not Modified"

*Defined in [src/fetch.ts:41](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L41)*

###  400

• **400**: *string* = "400 Bad Request"

*Defined in [src/fetch.ts:42](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L42)*

###  401

• **401**: *string* = "401 Unauthorized"

*Defined in [src/fetch.ts:43](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L43)*

###  500

• **500**: *string* = "500 Internal Server Error"

*Defined in [src/fetch.ts:44](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L44)*

###  501

• **501**: *string* = "501 Not Implemented"

*Defined in [src/fetch.ts:45](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L45)*

###  502

• **502**: *string* = "502 Bad Gateway"

*Defined in [src/fetch.ts:46](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L46)*

###  503

• **503**: *string* = "503 Service Unavailable"

*Defined in [src/fetch.ts:47](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L47)*

###  504

• **504**: *string* = "504 Gateway Timeout"

*Defined in [src/fetch.ts:48](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/bb3819c/src/fetch.ts#L48)*

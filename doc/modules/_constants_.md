[pan-cortex-hub](../README.md) › ["constants"](_constants_.md)

# External module: "constants"

## Index

### Object literals

* [cortexConstants](_constants_.md#const-cortexconstants)

## Object literals

### `Const` cortexConstants

### ▪ **cortexConstants**: *object*

Defined in src/constants.ts:21

Cortex constants

###  DEV_TOKEN_PROVIDER

• **DEV_TOKEN_PROVIDER**: *string* = "https://app.developers.paloaltonetworks.com/request_token"

Defined in src/constants.ts:56

URL of the Palo Alto Networks Developers Relations developer token service

###  IDP_AUTH_URL

• **IDP_AUTH_URL**: *string* = "https://identity.paloaltonetworks.com/as/authorization.oauth2"

Defined in src/constants.ts:52

Identity provider URL for token operations

###  IDP_REVOKE_URL

• **IDP_REVOKE_URL**: *string* = "https://api.paloaltonetworks.com/api/oauth2/RevokeToken"

Defined in src/constants.ts:48

Identity provider URL for token revoke operations

###  IDP_TOKEN_URL

• **IDP_TOKEN_URL**: *string* = "https://api.paloaltonetworks.com/api/oauth2/RequestToken"

Defined in src/constants.ts:44

Identity provider URL for authentication requests

▪ **APIEPMAP**: *object*

Defined in src/constants.ts:25

Map that links Cortex Data Lake regions with their corresponding FQDNs

* **americas**: *string* = USFQDN

* **europe**: *string* = EUFQDN

▪ **OAUTH2SCOPEMAP**: *object*

Defined in src/constants.ts:38

OAuth2 Identity Provider scopes for the Cortex Data Lake

* **ls_read**: *string* = "logging-service:read"

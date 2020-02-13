[pan-cortex-hub](../README.md) › ["hub/credentials_provider"](../modules/_hub_credentials_provider_.md) › [CredentialsItem](_hub_credentials_provider_.credentialsitem.md)

# Interface: CredentialsItem

SDK Representation of a Cortex credential set

## Hierarchy

* **CredentialsItem**

## Index

### Properties

* [accessToken](_hub_credentials_provider_.credentialsitem.md#accesstoken)
* [datalakeId](_hub_credentials_provider_.credentialsitem.md#datalakeid)
* [entryPoint](_hub_credentials_provider_.credentialsitem.md#entrypoint)
* [refreshToken](_hub_credentials_provider_.credentialsitem.md#refreshtoken)
* [validUntil](_hub_credentials_provider_.credentialsitem.md#validuntil)

## Properties

###  accessToken

• **accessToken**: *string*

Defined in src/hub/credentials_provider.ts:94

JWT access_token value

___

###  datalakeId

• **datalakeId**: *string*

Defined in src/hub/credentials_provider.ts:110

data lake identifier (application instance id)

___

###  entryPoint

• **entryPoint**: *string*

Defined in src/hub/credentials_provider.ts:102

Cortex API fqdn (region) in which this access_token is valid

___

###  refreshToken

• **refreshToken**: *string*

Defined in src/hub/credentials_provider.ts:106

refresh_token value bound to this access_token

___

###  validUntil

• **validUntil**: *number*

Defined in src/hub/credentials_provider.ts:98

Unix timestamp (in seconds) that mark the expiration time for this access_token

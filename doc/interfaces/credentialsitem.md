[@paloaltonetworks/pan-cortex-hub](../README.md) › [CredentialsItem](credentialsitem.md)

# Interface: CredentialsItem

SDK Representation of a Cortex credential set

## Hierarchy

* **CredentialsItem**

## Index

### Properties

* [accessToken](credentialsitem.md#accesstoken)
* [datalakeId](credentialsitem.md#datalakeid)
* [entryPoint](credentialsitem.md#entrypoint)
* [refreshToken](credentialsitem.md#refreshtoken)
* [validUntil](credentialsitem.md#validuntil)

## Properties

###  accessToken

• **accessToken**: *string*

*Defined in [src/hub/credentials_provider.ts:95](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L95)*

JWT access_token value

___

###  datalakeId

• **datalakeId**: *string*

*Defined in [src/hub/credentials_provider.ts:111](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L111)*

data lake identifier (application instance id)

___

###  entryPoint

• **entryPoint**: *string*

*Defined in [src/hub/credentials_provider.ts:103](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L103)*

Cortex API fqdn (region) in which this access_token is valid

___

###  refreshToken

• **refreshToken**: *string*

*Defined in [src/hub/credentials_provider.ts:107](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L107)*

refresh_token value bound to this access_token

___

###  validUntil

• **validUntil**: *number*

*Defined in [src/hub/credentials_provider.ts:99](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_provider.ts#L99)*

Unix timestamp (in seconds) that mark the expiration time for this access_token

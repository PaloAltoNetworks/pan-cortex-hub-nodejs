[@paloaltonetworks/pan-cortex-hub](../README.md) › [DevTokenCredentialsOptions](devtokencredentialsoptions.md)

# Interface: DevTokenCredentialsOptions

Options to customize a DevTokenCredentials subclass

## Hierarchy

* **DevTokenCredentialsOptions**

## Index

### Properties

* [developerToken](devtokencredentialsoptions.md#optional-developertoken)
* [developerTokenProvider](devtokencredentialsoptions.md#optional-developertokenprovider)
* [entryPoint](devtokencredentialsoptions.md#optional-entrypoint)
* [guardTime](devtokencredentialsoptions.md#optional-guardtime)

## Properties

### `Optional` developerToken

• **developerToken**? : *undefined | string*

*Defined in [src/hub/credentials_devtoken.ts:52](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_devtoken.ts#L52)*

Developer Token string

___

### `Optional` developerTokenProvider

• **developerTokenProvider**? : *undefined | string*

*Defined in [src/hub/credentials_devtoken.ts:48](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_devtoken.ts#L48)*

URI for the developer token provider

___

### `Optional` entryPoint

• **entryPoint**? : *undefined | string*

*Defined in [src/hub/credentials_devtoken.ts:56](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_devtoken.ts#L56)*

Cortex API fqdn to use (region)

___

### `Optional` guardTime

• **guardTime**? : *undefined | number*

*Defined in [src/hub/credentials_devtoken.ts:61](https://github.com/xhoms/pan-cortex-hub-nodejs/blob/8b95863/src/hub/credentials_devtoken.ts#L61)*

Amount of seconds ahead of access_token expiration in which a refresh
operation should be attempted

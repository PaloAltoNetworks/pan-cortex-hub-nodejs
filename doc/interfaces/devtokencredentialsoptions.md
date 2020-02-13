[pan-cortex-hub](../README.md) › [DevTokenCredentialsOptions](devtokencredentialsoptions.md)

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

Defined in src/hub/credentials_devtoken.ts:51

Developer Token string

___

### `Optional` developerTokenProvider

• **developerTokenProvider**? : *undefined | string*

Defined in src/hub/credentials_devtoken.ts:47

URI for the developer token provider

___

### `Optional` entryPoint

• **entryPoint**? : *undefined | string*

Defined in src/hub/credentials_devtoken.ts:55

Cortex API fqdn to use (region)

___

### `Optional` guardTime

• **guardTime**? : *undefined | number*

Defined in src/hub/credentials_devtoken.ts:60

Amount of seconds ahead of access_token expiration in which a refresh
operation should be attempted

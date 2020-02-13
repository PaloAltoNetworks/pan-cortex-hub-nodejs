[pan-cortex-hub](../README.md) › ["hub/credentials_devtoken"](../modules/_hub_credentials_devtoken_.md) › [DevTokenCredentialsOptions](_hub_credentials_devtoken_.devtokencredentialsoptions.md)

# Interface: DevTokenCredentialsOptions

Options to customize a DevTokenCredentials subclass

## Hierarchy

* **DevTokenCredentialsOptions**

## Index

### Properties

* [developerToken](_hub_credentials_devtoken_.devtokencredentialsoptions.md#optional-developertoken)
* [developerTokenProvider](_hub_credentials_devtoken_.devtokencredentialsoptions.md#optional-developertokenprovider)
* [entryPoint](_hub_credentials_devtoken_.devtokencredentialsoptions.md#optional-entrypoint)
* [guardTime](_hub_credentials_devtoken_.devtokencredentialsoptions.md#optional-guardtime)

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

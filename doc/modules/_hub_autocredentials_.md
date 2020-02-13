[pan-cortex-hub](../README.md) › ["hub/autocredentials"](_hub_autocredentials_.md)

# External module: "hub/autocredentials"

## Index

### Functions

* [autoCredentials](_hub_autocredentials_.md#autocredentials)

## Functions

###  autoCredentials

▸ **autoCredentials**(`opt?`: [CredentialProviderOptions](../interfaces/_hub_credentials_provider_.credentialprovideroptions.md) & [DevTokenCredentialsOptions](../interfaces/_hub_credentials_devtoken_.devtokencredentialsoptions.md) & object): *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

Defined in src/hub/autocredentials.ts:39

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
`opt?` | [CredentialProviderOptions](../interfaces/_hub_credentials_provider_.credentialprovideroptions.md) & [DevTokenCredentialsOptions](../interfaces/_hub_credentials_devtoken_.devtokencredentialsoptions.md) & object | any option from CredentialProviderOptions or DevTokenCredentialsOptions plus optional explicits values for `accessToken`, `refreshToken` and `entryPoint` |

**Returns:** *Promise‹[Credentials](../interfaces/_hub_credentials_.credentials.md)›*

a valid `Credentials` object for the identificators provided

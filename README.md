# pan-cortex-hub-nodejs
Collection of `Credentials` objects to be used alongside applications leveraging
the Cortex Data Lake API [See
https://github.com/xhoms/pan-cortex-data-lake-nodejs](https://github.com/xhoms/pan-cortex-data-lake-nodejs)

It also provides the `CortexHubHelper` abstract class as well as a couple of
implementations for quick prototyping SaaS Components to interface with Cortex hub.

## `Credentials` collection
Quick overview of available classes
### `StaticCredentials`
The most basic of them all. It just wraps a static `access_token` value

```javascript
const cortex = require('pan-cortex-hub');

const ACCESS_TOKEN = 'eyaa...4t8t';
const cred = new cortex.StaticCredentials(ACCESS_TOKEN, cortex.cortexConstants.APIEPMAP.americas);
```

### `SimpleCredentialsProvider`
A credentials object that provides a refreshed `access_token` from a known
OAuth2 `refresh_token` (plus `client_id` and `client_secret`)

Best practise to keep secrets secure is to provide them using environmental
variables.

```bash
PAN_CLIENT_ID=<client_id> \
PAN_CLIENT_SECRET=<client_secret> \
PAN_REFRESH_TOKEN=<refresj_token> \
node application.js
```

```javascript
const cortex = require('pan-cortex-hub');

async function main() {
    const cred = await cortex.SimpleCredentialsProvider.factory();
}
```

But, if needed, you can provide the secrets programatically.

```javascript
const cortex = require('pan-cortex-hub');

async function main() {
    const cred = await cortex.SimpleCredentialsProvider.factory({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN
    });
}
```

### `DevTokenCredentials`
Leverages a Token Redemption service (i.e. API Explorer)

Best practise is to provide the developer token using an environmental variable:

```bash
PAN_DEVELOPER_TOKEN=<developer_token> \
node application.js
```

```javascript
const cortex = require('pan-cortex-hub');

const cred = cortex.DevTokenCredentials.factory({
    developerTokenProvider: TOKEN_PROVIDER_URL
});
```

You can pass the developer token programatically if needed

```javascript
const cortex = require('pan-cortex-hub');

const cred = cortex.DevTokenCredentials.factory({
    developerToken: DEVELOPER_TOKEN,
    developerTokenProvider: TOKEN_PROVIDER_URL
});
```

## Credential Providers
If your application grows to the point it needs to interface with multiple data
lake instances then you'll face the need to store multiple `refresh_token`'s.

This is the moment when you can leverage the `CortexCredentialProvider` abstract
class. This class provides methods to cover the full life-cycle of a OAuth2
secret:
* `addWithRefreshToken()`: To register a new data lake instance
* `addWithCode()`: To register a new data lake instance using the OAuth2 code
  (from the code grant flow)
* `revokeDatalake()`: To revoke already issued refresh token
* `getCredentialsObject(datalakeId)`: Retrieves a `Credentials` object bound to
  the data lake identifier.

`CortexCredentialProvider` is meant to be subclassed. Developer doing so must
implement the following storage methods that will be triggered when needed.

* `upsertStoreItem(dlid, item)`: to store `item` as the valuer for data lake
  instance `dlid`
* `deleteStoreItem(dlid)`: remove the item for the data lake instance `dlid`
* `getStoreItem(dlid)`: retrieve the item for the data lake instance `dlid`
* `loadDb()`: perform initial database load

Subclass must call `super(opts)` with an object with configuration options. The
only two mandatory options are:

* `clientId`: OAuth2 application client_id value
* `clientSecret`: OAuth2 application client_secret value

### `FsCredProvider`
The library provides a `CortexCredentialProvier` implementation that stores the
secrets in a local file using AES encryption of sensitive values. You can leverage this class for initial prototyping.

Secrets must me provided as environmental variables:
```bash
PAN_CLIENT_ID=<OAuth2 client_id> \
PAN_CLIENT_SECRET=<OAuth2 client_secret> \
PAN_SCRET=<AES Encryption key> \
node application.js
```

```javascript
const cortex = require('pan-cortex-hub');

async function main() {
    const credProvider = await cortex.FsCredProvider.factory();
}
```

Now you can register a `refresh_token` you've received (i.e. at the end of a
OAuth2 code grant flow)

```javascript
const cred = await credProvider.addWithRefreshToken(
    'datalake-id',
    cortex.cortexConstants.APIEPMAP.americas,
    REFESH_TOKEN);
```

Or, if you want, you can use the CredentialProvider object to complete the
OAuth2 code grant flow for you.

```javascript
const cred = await credProvider.addWithCode(
    'datalake-id',
    cortex.cortexConstants.APIEPMAP.americas,
    { code: CODE, idpCallbackUrl: CALLBACK_URL });
```

In any case you receive at the end of the process a valid `Credentials` object
bound to the provided OAuth2 instance.

Secrets keep stored in a file named `PANCLOUD_CONFIG.json` (you can use another
file name using the option `configFile` in the static `factory()` method).

The static `factory()` methods attempts to locate the database file and, if
found, then its content is loaded as initial data. That means that you retrieve
a credentials object for a data lake instance that was registered in another
work session.

```javascript
const cred = await credProvider.getCredentialsObject('datalake-id');
```

## HubHelper
`CortexHubHelper` is an abstract class that provides two main features:
* Hooks to help onboard customers that are consuming applications through the
  Cortex hub:
    * Initial `params` parsing
    * Generation of the IDP Authentication Request URL
    * Completing the OAuth2 code grant flow
* Multi-tenancy: It automates a `CortexCredentialProvider` leveraging its
  metadada capability to organize data lakes into tenants.

See code examples in the `/examples` folder
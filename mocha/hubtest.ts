import * as assert from 'assert'
import { describe, it } from 'mocha'
import { StoreItem, CortexHubHelper, HubMetadata, CortexCredentialProvider, cortexConstants } from '../lib'

const utCfg = {
    APP_PARAMS: 'aW5zdGFuY2VfaWQ9NzM0NjI4NTcwNDQxNDExMzE4MSZpbnN0YW5jZV9uYW1lPXhob21zJTIwdGVzdCZyZWdpb249YW1lcmljYXMmbHNuPTAxNzkwMDA0OTQzJmRlc2NyaXB0aW9uPXhob21zJTIwdGVzdA==',
}

describe('cortex hub', function () {
    let hh: CortexHubHelper<never>

    before(function () {
        hh = new CortexHubHelper('callback', new (class cp extends CortexCredentialProvider<HubMetadata<never>> {
            constructor() {
                super({ clientId: 'client_id', clientSecret: 'client_secret' })
            }
            async upsertStoreItem(datalakeId: string, item: StoreItem<HubMetadata<never>>): Promise<void> {
            }
            async deleteStoreItem(datalakeId: string): Promise<void> {
            }
            async getStoreItem(datalakeId: string): Promise<StoreItem<HubMetadata<never>>> {
                return undefined
            }
            async loadDb(): Promise<void> {
            }
        })())
    })

    describe('params decoding', function () {

        it('decodes params', async function () {
            const clientParams = await hh.hubParamsRegister(utCfg.APP_PARAMS, 'default')
            assert.equal(clientParams.instance_id, '7346285704414113181', 'instance_id')
            assert.deepStrictEqual(clientParams.location, { region: "americas", entryPoint: "cortex-prd1-api.us.cdl.paloaltonetworks.com" }, 'location')
            assert.equal(clientParams.instance_name, 'xhoms test')
            assert.equal(clientParams.lsn, '01790004943')
        })

        it('gets stored', async function () {
            const clientParams = await hh.getDatalake('default', '7346285704414113181')
            assert.equal(clientParams.instance_id, '7346285704414113181', 'instance_id')
            assert.deepStrictEqual(clientParams.location, { region: "americas", entryPoint: "cortex-prd1-api.us.cdl.paloaltonetworks.com" }, 'location')
            assert.equal(clientParams.instance_name, 'xhoms test', 'instance name')
            assert.equal(clientParams.lsn, '01790004943', 'serial number')
        })

        it('state does not exists yet', async function () {
            assert.rejects(async function () {
                await hh.idpAuthCallback('code', '0-7346285704414113181:ZGVmYXVsdA==', 'default')
            }, { message: "state id not found (0-7346285704414113181:ZGVmYXVsdA==)" }, 'state does not exists yet')
        })

        it('unable to decode state', async function () {
            assert.rejects(async function () {
                await hh.idpAuthCallback('code', 'state', 'default')
            }, { message: "unable to decode id state" }, 'unable to decode state')
        })

        it('returns auth url', async function () {
            const authUrl = await hh.idpAuthRequest('default', '7346285704414113181', [cortexConstants.OAUTH2SCOPEMAP['ls-read']])
            assert.equal(authUrl.toString(), 'https://identity.paloaltonetworks.com/as/authorization.oauth2?response_type=code&client_id=client_id&redirect_uri=callback&scope=logging-service%3Aread&instance_id=7346285704414113181&region=americas&state=0-7346285704414113181%3AZGVmYXVsdA%3D%3D', 'Authentication URL')
        })

        it('list datalake', async function () {
            const kk = await hh.listDatalake('default')
            assert.equal(kk.length, 1, 'one entry in the list')
            assert.equal(kk[0].id, '7346285704414113181')
        })

        it('list active datalake', async function () {
            const kk = await hh.listActiveDatalake('default')
            assert.equal(kk.length, 0, 'no active datalakes')
        })
    })
})

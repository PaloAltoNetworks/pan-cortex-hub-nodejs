import * as express from 'express'
import * as fs from 'fs'
import * as https from 'https'
import { CortexHubHelper, FsCredProvider, HubMetadata, cortexConstants } from '@paloaltonetworks/pan-cortex-hub'

declare const APP_REDIRECT_FULL_URL: string
declare const APP_REDIRECT_PATH: string
declare const AES_SECRET: string
// required mandatory PAN_CLIENT_ID and PAN_CLIENT_SECRET environmental variables

const TENANT_ID = "default-tenant"

async function main() {
    // SSL Server certificate and private key
    const cert = fs.readFileSync('extra/cert.pem')
    const key = fs.readFileSync('extra/key.pem')
    const hubHelper = new CortexHubHelper<never>(
        APP_REDIRECT_FULL_URL,
        await FsCredProvider.factory<HubMetadata<never>>({ secret: AES_SECRET }))

    // ExpressJS application
    const saasComponent = express()

    // End Point main route (Cortex hub params parser)
    saasComponent.get('/', async (req, resp) => {
        const params = req.query.params
        if (params) {
            try {
                const clientParams = await hubHelper.hubParamsRegister(params, TENANT_ID)
                let responseText = `data lake ${clientParams.instance_id} registered under tenant ${TENANT_ID}`
                return resp.type('text').send(responseText)
            } catch (e) {
                return resp.status(500).send((e as Error).message)
            }
        } else {
            return resp.status(400).send('missing params')
        }
    })

    // End Point for authorization request redirect
    saasComponent.get('/auth-request/:tenantid/:datalakeid', async (req, resp) => {
        const { tenantid, datalakeid } = req.params
        try {
            const redirectUrl = await hubHelper.idpAuthRequest(tenantid, datalakeid, [cortexConstants.OAUTH2SCOPEMAP.ls_read])
            resp.redirect(redirectUrl.toString())
        } catch (e) {
            return resp.status(500).send((e as Error).message)
        }
    })

    // End Point for authorization request callback
    saasComponent.get(APP_REDIRECT_PATH, async (req, resp) => {
        const { code, state } = req.query
        if (code && state) {
            try {
                const cred = await hubHelper.idpAuthCallback(code, state, TENANT_ID)
                let responseText = `data lake successfully authorized for tenant ${TENANT_ID}`
                return resp.type('text').send(responseText)
            } catch (e) {
                return resp.status(500).send((e as Error).message)
            }
        } else {
            return resp.status(400).send('missing code or state')
        }
    })

    // End Point compatible with Developer Token credential
    saasComponent.post('/token/:tenantid/:datalakeid', async (req, resp) => {
        const { tenantid, datalakeid } = req.params
        try {
            const cred = await hubHelper.getCredentialsObject(tenantid, datalakeid)
            return resp.json({ access_token: await cred.getToken(true) })
        } catch (e) {
            return resp.status(500).send((e as Error).message)
        }
    })

    // End Point to delete (and revoke) an existing authorization
    saasComponent.get('/delete/:tenantid/:datalakeid', async (req, resp) => {
        const { tenantid, datalakeid } = req.params
        try {
            await hubHelper.deleteDatalake(tenantid, datalakeid)
            const responseText = `data lake ${datalakeid} unauthorized for tenant ${TENANT_ID}`
            return resp.type('text').send(responseText)
        } catch (e) {
            return resp.status(500).send((e as Error).message)
        }
    })

    // Start the HTTPS server
    const webServer = https.createServer({ key: key, cert: cert }, saasComponent)
    webServer.listen(443, () => console.log('Cortex Hub Debugger listening on 443'))
}

main().catch(console.error)
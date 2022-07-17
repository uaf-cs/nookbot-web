import { secret, strictVerify } from 'env-verifier'

const config = {
  discord: {
    id: 'DISCORD_CLIENT_ID',
    secret: secret('DISCORD_CLIENT_SECRET')
  },
  google: {
    id: 'GOOGLE_CLIENT_ID',
    secret: secret('GOOGLE_CLIENT_SECRET')
  },
  sesstionSecret: secret('SESSION_SECRET'),
  siteRoot: 'SITE_ROOT'
}

const env = strictVerify<typeof config>(config)

export default env

import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { SocialsProvider } from 'remix-auth-socials'
import invariant from 'tiny-invariant'
import { authenticator, connector } from '~/services/auth.server'

export const loader: LoaderFunction = () => redirect('/login')

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.provider, 'Expected params.provider')
  if (params.provider === SocialsProvider.DISCORD) {
    return await connector.authenticate(params.provider, request)
  }
  return await authenticator.authenticate(params.provider, request)
}

import type { LoaderFunction } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { authenticator } from '~/services/auth.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.provider, 'Expected params.provider')
  return await authenticator.authenticate(params.provider, request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  })
}

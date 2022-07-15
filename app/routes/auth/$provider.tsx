import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { authenticator } from '~/services/auth.server'

export const loader: LoaderFunction = () => redirect('/login')

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.provider, 'Expected params.provider')
  return await authenticator.authenticate(params.provider, request)
}

import type { LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  return await authenticator.authenticate(params.provider as string, request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  })
}

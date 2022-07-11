import type { ActionFunction } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

export const action: ActionFunction = async ({ request, params }) => {
  await authenticator.logout(request, { redirectTo: '/' })
}

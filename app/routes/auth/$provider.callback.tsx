import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { SocialsProvider } from 'remix-auth-socials'
import invariant from 'tiny-invariant'
import { authenticator, connector } from '~/services/auth.server'
import { prisma } from '~/services/prisma.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.provider, 'Expected params.provider')
  if (params.provider === SocialsProvider.DISCORD) {
    const discord = await connector.authenticate(params.provider, request, {
      // failureRedirect: '/onboarding/discord'
    })
    const currentUser = await authenticator.isAuthenticated(request, {
      failureRedirect: '/login'
    })

    await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        discordId: discord.id
      }
    })
    return redirect('/dashboard')
  } else {
    return await authenticator.authenticate(params.provider, request, {
      successRedirect: '/dashboard',
      failureRedirect: '/login'
    })
  }
}

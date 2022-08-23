import type { DiscordUser, User } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Callout, CalloutTypes } from '~/components/layout/callout'
import { CenterContent } from '~/components/layout/centerContent'
import { Navigate } from '~/components/navigate'
import { isAuthenticated } from '~/services/auth.server'
import { prisma } from '~/services/prisma.server'

interface LoaderData {
  user: User
  discord: DiscordUser
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await isAuthenticated(request, {
    failureRedirect: '/login'
  })
  if (user.discordId === null) {
    return redirect('/onboarding/discord')
  }

  const discord = await prisma.discordUser.findFirstOrThrow({
    where: {
      id: user.discordId
    }
  })

  return json<LoaderData>({
    user,
    discord
  })
}

export default function Dashboard () {
  const { user, discord } = useLoaderData<LoaderData>()
  return (
    <CenterContent>
      <h1 className='text text-4xl'>Welcome, {user.fullName}!</h1>
      {user.academicStatus === null
        ? <Callout type={CalloutTypes.WARN} title='Academic Status'>
          You haven't selected your current academic status yet. Selecting your academic status helps other community
          members see at a glance if you're a current student. Head over to your{' '}
          <Navigate to='/settings'>user settings</Navigate> to update your preferences.
        </Callout>
        : null
      }
      <p>
        TODO:
      </p>
      <ul>
        <li>academic status selection</li>
        <li>popular community list</li>
        <li>currently joined communities</li>
        <li>add new community</li>
      </ul>
      <Callout>
        Your currently connected Discord account is <code>{discord.username}#{discord.discriminator}</code>. If this is
        no longer accurate, <Navigate to="/onboarding/discord">relink your Discord account</Navigate>.
      </Callout>
    </CenterContent>
  )
}

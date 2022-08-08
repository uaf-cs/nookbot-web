import type { DiscordUser, User } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { CenterContent } from '~/components/layout/centerContent'
import { authenticator } from '~/services/auth.server'
import { prisma } from '~/services/prisma.server'

interface LoaderData {
  user: User
  discord: DiscordUser
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
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
      <p>
        TODO:
      </p>
      <ul>
        <li>academic status selection</li>
        <li>popular community list</li>
        <li>currently joined communities</li>
        <li>add new community</li>
      </ul>
    </CenterContent>
  )
}

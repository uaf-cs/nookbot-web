import { AcademicStatus, DiscordUser, User } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { Radio } from '~/components/forms/radio'
import { Callout, CalloutTypes } from '~/components/layout/callout'
import { CenterContent } from '~/components/layout/centerContent'
import { Navigate } from '~/components/navigate'
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
  const [selection, setSelection] = useState<string | null>(user.academicStatus)

  const academicStatusOptions = [{
    name: 'Student',
    value: AcademicStatus.STUDENT
  }, {
    name: 'Alumni',
    value: AcademicStatus.ALUMNI
  }]

  return (
    <CenterContent>
      <h1 className='text text-4xl'>User Settings</h1>
      <Radio
        label='Academic Status'
        name='academic-status'
        options={academicStatusOptions}
        selected={selection}
        onChange={setSelection}
      />
    </CenterContent>
  )
}

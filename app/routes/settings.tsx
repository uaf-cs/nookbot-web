import { AcademicStatus, DiscordUser, User } from '@prisma/client'
import type { ActionFunction, ErrorBoundaryComponent, LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const academicStatus = await formData.get('academic-status')

  if (typeof academicStatus !== 'string' || !Object.keys(AcademicStatus).includes(academicStatus)) {
    throw new TypeError(`academic-status should be one of: ${Object.keys(AcademicStatus).toString()}`)
  }

  return null
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
      <Form method='post'>
        <Radio
          label='Academic Status'
          name='academic-status'
          options={academicStatusOptions}
          selected={selection}
          onChange={setSelection}
        />
        <div className="flex mt-6 justify-end">
          <button className='button success' type="submit">Save</button>
        </div>
      </Form>
    </CenterContent>
  )
}

export function ErrorBoundary ({ error }: { error: Error }) {
  return (
    <>
      <h1>Unexpected Error: {error.name}</h1>
      <p>{error.message}</p>
    </>
  )
}
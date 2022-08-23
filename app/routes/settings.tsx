import { AcademicStatus, DiscordUser, User } from '@prisma/client'
import type { ActionFunction, ErrorBoundaryComponent, LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { Radio } from '~/components/forms/radio'
import { Callout, CalloutTypes } from '~/components/layout/callout'
import { CenterContent } from '~/components/layout/centerContent'
import { Navigate } from '~/components/navigate'
import { authenticator } from '~/services/auth.server'
import { prisma } from '~/services/prisma.server'

interface ActionData {
  errors: {
    academicStatus?: string
  }
}

interface LoaderData {
  user: User
  discord: DiscordUser
}

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })
  if (user.discordId === null) {
    return redirect('/onboarding/discord')
  }

  const formData = await request.formData()

  const academicStatus = await formData.get('academic-status')

  const errors: ActionData['errors'] = {}

  if (!Object.keys(AcademicStatus).includes(academicStatus as string)) {
    errors.academicStatus = 'Please select your current academic status'
  }

  if (Object.keys(errors).length === 0) {
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        academicStatus: academicStatus as AcademicStatus
      }
    })
    console.log('updated academic status')
  }

  return { errors }
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
  const { errors } = useActionData<ActionData>() ?? { errors: {} }
  const [selection, setSelection] = useState<string | null>(user.academicStatus)

  console.log(user)

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
      <Form method='post' reloadDocument>
        <Radio
          label='Academic Status'
          name='academic-status'
          options={academicStatusOptions}
          selected={selection}
          onChange={setSelection}
        />
        {errors.academicStatus === undefined ? null : <p className='text-rose-500 mt-2'>{errors.academicStatus}</p>}
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

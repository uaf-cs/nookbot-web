import type { User } from '@prisma/client'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { SocialsProvider } from 'remix-auth-socials'
import { SocialButton } from '~/components/forms/socialButton'
import { CenterContent } from '~/components/layout/centerContent'
import { authenticator } from '~/services/auth.server'

interface LoaderData {
  user: User
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  return json<LoaderData>({
    user
  })
}

export const meta: MetaFunction = () => ({
  title: 'Nookbot | Connect to Discord'
})

export default function Onboarding () {
  const { user } = useLoaderData<LoaderData>()

  return (
    <CenterContent>
      <h1 className='text-2xl'>Connect to Discord</h1>
      <p>
        Hiya <span className='font-bold'>{user.fullName}</span>, thanks for logging in! Before we can continue, we'll
        need you to connect your Discord account. We use your Discord account information to add you to UAF Discord
        communities, automatically vetting you as a UA affiliated person. Don't have a Discord account yet? You'll
        have the option to create one after following the below link. You can update your Discord account later via
        the Dashboard.
      </p>
      <div className="space-y-2">
        <SocialButton provider={SocialsProvider.DISCORD} label="Login with Discord" />
      </div>
    </CenterContent>
  )
}

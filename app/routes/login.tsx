import type { LoaderFunction } from '@remix-run/node'
import { SocialsProvider } from 'remix-auth-socials'
import { isAuthenticated } from '~/services/auth.server'
import { SocialButton } from '../components/forms/socialButton'
import { CenterContent } from '../components/layout/centerContent'

export const loader: LoaderFunction = async ({ request }) => {
  await isAuthenticated(request, {
    successRedirect: '/dashboard'
  })

  return null
}

export default function Login () {
  return (
    <>
      <CenterContent>
        <h1 className='text-2xl'>Login</h1>
        <p>
          To verify your identity, we need you to log in via both Google and Discord. This allows us to verify your
          status as someone who is affiliated with the University of Alaska, and will give you access to gated
          communities. This restriction helps to keep communities organized as well as helping users identify peers by
          automatically setting your preferred name across all communities that you join. Click below to begin the login
          process.
        </p>
        <div className="space-y-2">
          <SocialButton provider={SocialsProvider.GOOGLE} label="Login with Google" />
        </div>
      </CenterContent>
    </>
  )
}

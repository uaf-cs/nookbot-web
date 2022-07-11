import { Form } from '@remix-run/react'
import { SocialsProvider } from 'remix-auth-socials'

interface SocialButtonProps {
  provider: SocialsProvider
  label: string
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, label }: { provider: SocialsProvider, label: string }) => {
  let brandClass = 'bg-uaf-blue'
  switch (provider) {
    case SocialsProvider.DISCORD:
      brandClass = 'bg-[#5865F2]'
      break

    case SocialsProvider.GOOGLE:
      brandClass = 'bg-[#4285F4]'
  }
  return (
    <Form action={`/auth/${provider as string}`} method="post" className='flex flex-col items-center'>
      <button className={'min-w-[300px] text-white px-4 py-2 rounded-md ' + brandClass}>{label}</button>
    </Form>
  )
}

export default function Login () {
  return (
    <>
      <div className="w-lg max-w-3xl self-center space-y-4">
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
      </div>
    </>
  )
}

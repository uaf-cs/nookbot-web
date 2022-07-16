import { Form } from '@remix-run/react'
import { SocialsProvider } from 'remix-auth-socials'

interface SocialButtonProps {
  provider: SocialsProvider
  label: string
}
export const SocialButton: React.FC<SocialButtonProps> = ({ provider, label }: { provider: SocialsProvider, label: string }) => {
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

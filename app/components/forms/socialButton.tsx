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
      brandClass = 'border-b-[#5865F2]'
      break

    case SocialsProvider.GOOGLE:
      brandClass = 'border-b-[#4285F4]'
  }
  return (
    <Form action={`/auth/${provider as string}`} method="post" className='flex flex-col items-center'>
      <button className={'min-w-[300px] button bg-slate-100 ' + brandClass}>{label}</button>
    </Form>
  )
}

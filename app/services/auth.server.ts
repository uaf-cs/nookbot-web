import { Authenticator } from 'remix-auth'
import { sessionStorage } from '~/services/session.server'
import { GoogleStrategy, SocialsProvider } from 'remix-auth-socials'
import type { User } from '@prisma/client'
import { prisma } from '~/services/prisma.server'
import env from './env.server'

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage, {
  sessionKey: '_authenticaiton'
})

authenticator.use(new GoogleStrategy({
  clientID: env.google.id,
  clientSecret: env.google.secret.reveal(),
  callbackURL: `${env.siteRoot}/auth/${SocialsProvider.GOOGLE}/callback`
}, async ({ profile }) => {
  let user = await prisma.user.findUnique({ where: { googleId: profile.id } })

  const googleUser = {
    id: profile.id,
    displayName: profile.displayName,
    email: profile.emails.find(e => e.value !== undefined)?.value ?? ''
  }

  if (user == null) {
    user = await prisma.user.create({
      data: {
        google: {
          connectOrCreate: {
            where: {
              id: profile.id
            },
            create: googleUser
          }
        }
      }
    })
  } else {
    await prisma.googleUser.update({ where: { id: profile.id }, data: googleUser })
  }

  return user
}))

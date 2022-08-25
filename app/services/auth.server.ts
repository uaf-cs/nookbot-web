/* eslint-disable @typescript-eslint/no-throw-literal */
import { Authenticator } from 'remix-auth'
import { sessionStorage } from '~/services/session.server'
import type { DiscordProfile } from 'remix-auth-socials'
import { DiscordStrategy, GoogleStrategy, SocialsProvider } from 'remix-auth-socials'
import type { User } from '@prisma/client'
import { prisma } from '~/services/prisma.server'
import env from '~/services/env.server'
import { redirect } from '@remix-run/node'

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<string>(sessionStorage, {
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
    email: profile.emails.find(e => e.value !== undefined)?.value ?? '',
    avatar: profile.photos[0]?.value
  }

  if (user == null) {
    user = await prisma.user.create({
      data: {
        fullName: profile.displayName,
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
    user = await prisma.user.update({
      where: { googleId: profile.id },
      data: {
        fullName: profile.displayName
      }
    })
    await prisma.googleUser.update({ where: { id: profile.id }, data: googleUser })
  }

  return user.id
}))

export const connector = new Authenticator<DiscordProfile>(sessionStorage, {
  sessionKey: '_authenticationConnection'
})

connector.use(new DiscordStrategy({
  clientID: env.discord.id,
  clientSecret: env.discord.secret.reveal(),
  callbackURL: `${env.siteRoot}/auth/${SocialsProvider.DISCORD}/callback`,
  scope: ['identify', 'guilds', 'guilds.join']
}, async ({ profile, accessToken, refreshToken }) => {
  console.log(profile)
  await prisma.discordUser.upsert({
    where: {
      id: profile.id
    },
    create: {
      id: profile.id,
      username: profile.__json.username,
      discriminator: profile.__json.discriminator,
      avatar: profile.__json.avatar,

      accessToken,
      refreshToken
    },
    update: {
      username: profile.__json.username,
      discriminator: profile.__json.discriminator,

      accessToken,
      refreshToken
    }
  })
  return profile
}
))

export async function isAuthenticated (
  request: Request,
  options?: { successRedirect?: never, failureRedirect?: never }
): Promise<User | null>
export async function isAuthenticated (
  request: Request,
  options: { successRedirect: string, failureRedirect?: never }
): Promise<null>
export async function isAuthenticated (
  request: Request,
  options: { successRedirect?: never, failureRedirect: string }
): Promise<User>
export async function isAuthenticated (
  request: Request,
  options: { successRedirect: string, failureRedirect: string }
): Promise<null>

export async function isAuthenticated (
  request: Request,
  options:
  | { successRedirect?: never, failureRedirect?: never }
  | { successRedirect: string, failureRedirect?: never }
  | { successRedirect?: never, failureRedirect: string }
  | { successRedirect: string, failureRedirect: string } = {}
): Promise<User | null> {
  const id = await authenticator.isAuthenticated(request)

  if (id === null) {
    if (options.failureRedirect !== undefined) {
      throw redirect(options.failureRedirect)
    }
    return null
  }

  const user: User | null = await prisma.user.findFirst({ where: { id } }) as User

  if (options.successRedirect !== undefined) {
    throw redirect(options.successRedirect)
  } else {
    return user
  }
}

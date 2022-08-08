import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'

import styles from './tailwind.css'
import { Navbar } from '~/components/layout/navbar'
import type { GoogleUser, User } from '@prisma/client'
import { authenticator } from './services/auth.server'
import { prisma } from './services/prisma.server'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
]

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Nookbot',
  viewport: 'width=device-width,initial-scale=1'
})

interface LoaderData {
  user: User | null
  googleUser: GoogleUser | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  let googleUser: GoogleUser | null = null
  if (user !== null) {
    googleUser = await prisma.googleUser.findFirst({
      where: {
        id: user.googleId
      }
    })
  }

  return json<LoaderData>({
    user,
    googleUser
  })
}

export default function App () {
  const { user, googleUser } = useLoaderData<LoaderData>()
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className='flex flex-col space-y-2'>
        <Navbar user={user} googleUser={googleUser}></Navbar>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

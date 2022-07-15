import { json, LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
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
import type { User } from '@prisma/client'
import { authenticator } from './services/auth.server'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
]

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

interface LoaderData {
  user: User | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)

  return json<LoaderData>({
    user
  })
}

export default function App () {
  const { user } = useLoaderData<LoaderData>()
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className='flex flex-col space-y-2'>
        <Navbar user={user}></Navbar>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

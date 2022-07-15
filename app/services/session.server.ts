import { createSessionStorage } from '@remix-run/node' // or "@remix-run/cloudflare"
import { prisma } from '~/services/prisma.server'
import env from './env.server'

type Cookie = Parameters<typeof createSessionStorage>[0]['cookie']

function createDatabaseSessionStorage (cookie: Cookie) {
  return createSessionStorage({
    cookie,
    async createData (data, expires) {
      // `expires` is a Date after which the data should be considered
      // invalid. You could use it to invalidate the data somehow or
      // automatically purge this record from your database.
      const session = await prisma.session.create({
        data: {
          data: JSON.stringify(data)
        }
      })
      return session.id
    },
    async readData (id) {
      const sess = await prisma.session.findUnique({ where: { id } })
      return JSON.parse(sess?.data ?? '{}')
    },
    async updateData (id, data, expires) {
      await prisma.session.update(
        {
          where: { id },
          data: {
            id,
            data: JSON.stringify(data)
          }
        }
      )
    },
    async deleteData (id) {
      await prisma.session.delete({ where: { id } })
    }
  })
}

export const sessionStorage = createDatabaseSessionStorage({
  name: '_session', // use any name you want here
  sameSite: 'lax', // this helps with CSRF
  path: '/', // remember to add this so the cookie will work in all routes
  httpOnly: true, // for security reasons, make this cookie http only
  secrets: [env.sesstionSecret.reveal()], // replace this with an actual secret
  secure: process.env.NODE_ENV === 'production' // enable this in prod only
})

export const { getSession, commitSession, destroySession } = sessionStorage

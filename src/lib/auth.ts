import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'
import { username } from 'better-auth/plugins'
import prisma from './prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  baseURL: 'http://localhost:3000/',
  emailAndPassword: { enabled: true },
  plugins: [nextCookies(), username()],
})

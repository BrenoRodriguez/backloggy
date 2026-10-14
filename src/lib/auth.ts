import { drizzleAdapter } from '@better-auth/drizzle-adapter/relations-v2'
import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { username } from 'better-auth/plugins'
import * as schema from '../db/auth-schema'
import { db } from './db'

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', schema }),
  baseURL: 'http://localhost:3000/',
  emailAndPassword: { enabled: true },
  plugins: [nextCookies(), username()],
})

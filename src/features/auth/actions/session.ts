'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function getSession() {
  const requestHeaders = await headers()
  const session = await auth.api.getSession({ headers: requestHeaders })
  return { session, requestHeaders }
}

export async function getSessionId() {
  const requestHeaders = await headers()
  const session = await auth.api.getSession({ headers: requestHeaders })

  if (!session) {
    throw new Error('Session not found!')
  }

  return { id: session.user.id, requestHeaders }
}

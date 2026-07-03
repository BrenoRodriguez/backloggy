'use server'

import { auth } from '@/lib/auth'
import { getErrorMessage } from '@/utils'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  try {
    const requestHeaders = await headers()
    await auth.api.signOut({ headers: requestHeaders })
  } catch (error) {
    console.error(`Logout Error: ${getErrorMessage(error)}`)
    return
  }
  redirect('/')
}

'use server'

import { auth } from '@/lib/auth'
import type { ActionResult } from '@/types'
import { tryCatch } from '@/utils'
import { LoginSchema, type LoginData } from '../schemas'

export async function login(data: LoginData): Promise<ActionResult> {
  const { email, password, keepSignedIn } = LoginSchema.parse(data)

  const [_, loginError] = await tryCatch(
    auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: keepSignedIn,
      },
    }),
  )

  if (loginError) {
    return {
      success: false,
      error: 'Login failed try again!',
    }
  }

  return {
    success: true,
    message: 'Login was successful!',
  }
}

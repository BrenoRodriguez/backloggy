'use server'

import { createSettings } from '@/features/settings/actions/createSettings'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import type { ActionResult } from '@/types'
import { tryCatch } from '@/utils'
import { type RegisterData, RegisterSchema } from '../schemas'

export async function register(data: RegisterData): Promise<ActionResult> {
  const { email, username, password, acceptTOS } = RegisterSchema.parse(data)

  if (!acceptTOS) {
    return {
      success: false,
      error: 'You need accept the Terms of Service',
    }
  }

  const [registerData, registerError] = await tryCatch(
    auth.api.signUpEmail({
      body: {
        email,
        password,
        name: username,
        displayUsername: username,
      },
    }),
  )

  if (registerError || !registerData) {
    return { success: false, error: 'Email or username already taken.' }
  }

  console.log(registerData.user)

  const [settingsData, settingsError] = await tryCatch(
    createSettings(registerData.user.id),
  )

  console.log(settingsError)

  if (settingsError) {
    await deleteUserAndVerification(
      registerData.user.id,
      registerData.user.email,
    )
    return {
      success: false,
      error: 'Failed to register account. Please try again.',
    }
  }

  return {
    success: true,
    message: 'You successfully registered!',
  }
}

async function deleteUserAndVerification(userId: string, email: string) {
  await prisma.$transaction([
    prisma.verification.deleteMany({
      where: { identifier: email },
    }),
    prisma.user.delete({
      where: { id: userId },
    }),
  ])
}

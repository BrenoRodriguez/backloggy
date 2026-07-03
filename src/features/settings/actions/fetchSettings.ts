'use server'

import { getSession } from '@/features/auth/actions'
import prisma from '@/lib/prisma'
import { getErrorMessage } from '@/utils'

export async function fetchSettings() {
  try {
    const { session } = await getSession()

    if (!session) {
      return undefined
    }

    return await prisma.settings.findUniqueOrThrow({
      select: {
        priorities: true,
        genres: true,
        tagSettings: true,
      },
      where: {
        userId: session.user.id,
      },
    })
  } catch (error) {
    console.error(`Error while fetching settings: ${getErrorMessage(error)}`)
    return undefined
  }
}

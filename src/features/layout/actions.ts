'use server'

import { getErrorMessage, nullToUndefined } from '@/utils'
import { getSessionId } from '../auth/actions'
import prisma from '@/lib/prisma'
import type { Avatar } from './types'

export async function fetchUserAvatar(): Promise<Avatar> {
  try {
    const { id } = await getSessionId()

    const avatar = await prisma.user.findUnique({
      select: {
        username: true,
        image: true,
      },
      where: {
        id,
      },
    })

    if (!avatar) {
      throw new Error('Error finding a profile!')
    }

    if ((!avatar.image && !avatar.username) || !avatar.username) {
      return {
        username: 'U',
      }
    }

    return {
      username: avatar.username,
      avatarURL: nullToUndefined(avatar.image),
    }
  } catch (error) {
    console.error(`Error while fetching user avatar: ${getErrorMessage(error)}`)
    return {
      username: 'U',
    }
  }
}

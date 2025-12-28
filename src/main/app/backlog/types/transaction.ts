import type { DefaultArgs } from '@prisma/client/runtime/client'
import type { PrismaClient } from '../../../../../generated/prisma/client'

export type TransactionType = Omit<
  PrismaClient<never, undefined, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$extends'
>

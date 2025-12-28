import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '../../../generated/prisma/client'
import { getPaths } from '../utils'

const { databasePath } = getPaths()

const adapter = new PrismaBetterSqlite3({ url: databasePath })

export const prisma = new PrismaClient({ adapter })

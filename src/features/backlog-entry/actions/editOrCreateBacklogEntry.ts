'use server'

import { getSessionId } from '@/features/auth/actions'
import type { PriorityLevel, Prisma, TagSlot } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { TAG_SLOTS } from '../constants'
import {
  BacklogEntrySchema,
  type BacklogEntryData,
  type BacklogEntryInput,
} from '../schema'

export async function createOrEditBacklogEntry(
  data: BacklogEntryInput,
  gameIGDBId: number,
) {
  const { id: userId } = await getSessionId()

  const backlogEntry = BacklogEntrySchema.parse(data)
  const {
    customGenres,
    customTag1,
    customTag2,
    customTag3,
    customTag4,
    customTag5,
    ...otherProperties
  } = backlogEntry

  await prisma.$transaction(async (tx) => {
    const backlogEntry = await upsertBacklogEntry(tx, userId, gameIGDBId, {
      ...otherProperties,
    })

    await syncCustomTags(
      tx,
      [customTag1, customTag2, customTag3, customTag4, customTag5],
      backlogEntry.backlogEntryId,
    )

    await upsertGenres(tx, customGenres ?? [], backlogEntry)
  })
}

type BacklogEntryPayload = Omit<
  BacklogEntryData,
  | 'customTag1'
  | 'customTag2'
  | 'customTag3'
  | 'customTag4'
  | 'customTag5'
  | 'customGenres'
>

async function upsertBacklogEntry(
  tx: Prisma.TransactionClient,
  userId: string,
  gameIGDBId: number,
  backlogEntryData: BacklogEntryPayload,
) {
  const { completionStatus, priority, ...otherProperties } = backlogEntryData

  const priorityId = await getPriorityId(tx, userId, priority)

  const backlogEntry = await tx.backlogEntry.upsert({
    where: { gameIGDBId_userId: { gameIGDBId, userId } },
    update: {
      completionStatus: completionStatus ?? 'UNFINISHED',
      priorityId: priorityId ?? null,
      ...otherProperties,
    },
    create: {
      gameIGDBId,
      userId,
      completionStatus: completionStatus ?? 'UNFINISHED',
      priorityId: priorityId ?? null,
      ...otherProperties,
    },
    select: {
      id: true,
      genres: {
        select: {
          genreId: true,
        },
      },
    },
  })

  return {
    backlogEntryId: backlogEntry.id,
    previousGenres: backlogEntry.genres.flatMap(({ genreId }) => genreId),
  }
}

async function getPriorityId(
  tx: Prisma.TransactionClient,
  userId: string,
  priorityLevel: PriorityLevel | undefined,
) {
  if (!priorityLevel) {
    return undefined
  }
  console.log(`${priorityLevel} aaaa`)
  const priority = await tx.priority.findFirst({
    where: {
      userId: userId,
      level: priorityLevel,
    },
    select: {
      id: true,
    },
  })

  if (!priority) {
    return undefined
  }

  return priority.id
}

async function syncCustomTags(
  tx: Prisma.TransactionClient,
  rawCustomTags: (string | undefined)[],
  entryId: number,
) {
  const customTags = mapCustomTags(rawCustomTags)

  if (customTags.length === 0) {
    return tx.customTag.deleteMany({ where: { entryId } })
  }

  const customTagsToUpsert = customTags.map(({ slot, value }) => {
    return tx.customTag.upsert({
      where: { slot_entryId: { slot, entryId } },
      update: { value },
      create: { slot, value, entryId },
    })
  })

  await Promise.all(customTagsToUpsert)

  const newCustomTagSlots = new Set(
    customTags.map(({ slot }) => {
      return slot
    }),
  )

  await tx.customTag.deleteMany({
    where: {
      entryId,
      slot: { notIn: Array.from(newCustomTagSlots) },
    },
  })
}

async function upsertGenres(
  tx: Prisma.TransactionClient,
  customGenres: number[],
  backlogEntry: {
    backlogEntryId: number
    previousGenres: number[]
  },
) {
  const { backlogEntryId, previousGenres } = backlogEntry

  if (!previousGenres?.length && customGenres.length === 0) {
    return
  }

  if (customGenres.length === 0) {
    return await tx.backlogEntryGenre.deleteMany({
      where: {
        backlogEntryId,
      },
    })
  }

  if (!previousGenres?.length) {
    const genresToCreate = mapGenresForCreateMany(customGenres, backlogEntryId)

    return await tx.backlogEntryGenre.createMany({
      data: genresToCreate,
      skipDuplicates: true,
    })
  }

  const genresToCreate = filterGenresToCreate(
    previousGenres,
    customGenres,
    backlogEntryId,
  )

  await tx.backlogEntryGenre.createMany({
    data: genresToCreate,
    skipDuplicates: true,
  })

  const genresToDelete = filterGenresToDelete(previousGenres, customGenres)

  await tx.backlogEntryGenre.deleteMany({
    where: {
      backlogEntryId,
      genreId: { in: genresToDelete },
    },
  })
}

function filterGenresToDelete(
  previousGenres: number[],
  customGenres: number[],
) {
  return previousGenres.filter((genreId) => {
    return !customGenres.includes(genreId)
  })
}

function filterGenresToCreate(
  previousGenres: number[],
  customGenres: number[],
  backlogEntryId: number,
) {
  const filteredGenres = customGenres.filter((genreId) => {
    return !previousGenres.includes(genreId)
  })

  return mapGenresForCreateMany(filteredGenres, backlogEntryId)
}

function mapGenresForCreateMany(genres: number[], backlogEntryId: number) {
  return genres.map((genreId) => {
    return { backlogEntryId, genreId }
  })
}

function mapCustomTags(
  customTags: (string | undefined)[],
): { value: string; slot: TagSlot }[] {
  return TAG_SLOTS.flatMap((slot, index) => {
    const value = customTags[index]
    return value !== undefined ? [{ value, slot }] : []
  })
}

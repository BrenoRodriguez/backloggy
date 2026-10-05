import { sql } from 'drizzle-orm'
import {
  boolean,
  foreignKey,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core'

export const companyType = pgEnum('CompanyType', [
  'MAIN_COMPANY',
  'DIVISION',
  'SUBSIDIARY',
  'HOLDING_COMPANY',
  'SOLO_DEV',
])
export const gameType = pgEnum('GameType', [
  'MAIN_GAME',
  'DLC',
  'EXPANSION',
  'BUNDLE',
  'STANDALONE_EXPANSION',
  'MOD',
  'EPISODE',
  'SEASON',
  'REMAKE',
  'REMASTER',
  'EXPANDED_GAME',
  'PORT',
  'FORK',
  'PACK_ADDON',
  'UPDATE',
])
export const gameStatus = pgEnum('GameStatus', [
  'RELEASED',
  'ALPHA',
  'BETA',
  'EARLY_ACCESS',
  'OFFLINE',
  'CANCELLED',
  'RUMORED',
  'DELISTED',
  'UNKNOWN',
])
export const gameRelationType = pgEnum('GameRelationType', [
  'REMAKE',
  'REMASTER',
  'PORT',
  'DLC',
  'EXPANSION',
  'BUNDLE',
  'SIMILAR',
  'EXPANDED_VERSION',
])
export const companyGameRelationType = pgEnum('CompanyGameRelationType', [
  'DEVELOPED',
  'PUBLISHED',
])
export const backlogEntryStatus = pgEnum('BacklogEntryStatus', [
  'BACKLOG',
  'PLAYING',
  'PLAYED',
  'WISHLIST',
])
export const backlogCompletionStatus = pgEnum('BacklogCompletionStatus', [
  'UNFINISHED',
  'BEATEN',
  'COMPLETED',
  'DROPPED',
])
export const backlogOwnership = pgEnum('BacklogOwnership', [
  'OWNED',
  'NOT_OWNED',
])
export const backlogCardStatus = pgEnum('BacklogCardStatus', [
  'EARLY_ACCESS',
  'REGION_LOCKED',
  'BEATEN',
  'COMPLETED',
  'DROPPED',
  'WISHLIST',
  'BACKLOG',
  'PLAYING',
  'UNKNOWN',
])
export const privacyStatus = pgEnum('PrivacyStatus', [
  'PUBLIC',
  'FRIENDS_ONLY',
  'PRIVATE',
])
export const priorityLevel = pgEnum('PriorityLevel', [
  'ONE',
  'TWO',
  'THREE',
  'FOUR',
  'FIVE',
  'SIX',
  'SEVEN',
  'EIGHT',
  'NINE',
  'TEN',
])
export const tagType = pgEnum('TagType', ['NUMBER', 'TEXT', 'LIST', 'DATE'])
export const tagSlot = pgEnum('TagSlot', [
  'FIRST',
  'SECOND',
  'THIRD',
  'FOURTH',
  'FIFTH',
])

export const prismaMigrations = pgTable('_prisma_migrations', {
  id: varchar({ length: 36 }).primaryKey(),
  checksum: varchar({ length: 64 }).notNull(),
  finishedAt: timestamp('finished_at', { withTimezone: true }),
  migrationName: varchar('migration_name', { length: 255 }).notNull(),
  logs: text(),
  rolledBackAt: timestamp('rolled_back_at', { withTimezone: true }),
  startedAt: timestamp('started_at', { withTimezone: true })
    .default(sql`now()`)
    .notNull(),
  appliedStepsCount: integer('applied_steps_count').default(0).notNull(),
})

export const account = pgTable(
  'account',
  {
    id: text().primaryKey(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp({ precision: 3 }),
    refreshTokenExpiresAt: timestamp({ precision: 3 }),
    scope: text(),
    password: text(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    index('account_userId_idx').using('btree', table.userId.asc().nullsLast()),
  ],
)

export const apiToken = pgTable('api_token', {
  provider: text().primaryKey(),
  token: text().notNull(),
  expiresAt: timestamp('expires_at', { precision: 3 }).notNull(),
})

export const backlogEntry = pgTable(
  'backlog_entry',
  {
    id: serial().primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    platformId: integer('platform_id')
      .notNull()
      .references(() => platform.igdbId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    customCover: text('custom_cover'),
    status: backlogEntryStatus().notNull(),
    completionStatus: backlogCompletionStatus('completion_status').notNull(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    playtimeMinutes: integer('playtime_minutes'),
    priorityId: integer('priority_id').references(() => priority.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    sortOrder: integer('sort_order').notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
    customName: text('custom_name'),
    gameIgdbId: integer('game_igdb_id')
      .notNull()
      .references(() => game.igdbId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    endDate: timestamp('end_date', { precision: 3 }),
    startDate: timestamp('start_date', { precision: 3 }),
    completionTime: integer('completion_time'),
  },
  (table) => [
    uniqueIndex('backlog_entry_game_igdb_id_user_id_key').using(
      'btree',
      table.gameIgdbId.asc().nullsLast(),
      table.userId.asc().nullsLast(),
    ),
  ],
)

export const backlogEntryGenre = pgTable(
  'BacklogEntryGenre',
  {
    backlogEntryId: integer()
      .notNull()
      .references(() => backlogEntry.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    genreId: integer()
      .notNull()
      .references(() => genre.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  },
  (table) => [
    primaryKey({
      columns: [table.backlogEntryId, table.genreId],
      name: 'BacklogEntryGenre_pkey',
    }),
    index('BacklogEntryGenre_genreId_idx').using(
      'btree',
      table.genreId.asc().nullsLast(),
    ),
  ],
)

export const collection = pgTable('collection', {
  igdbId: integer('igdb_id').primaryKey(),
  name: text().notNull(),
  slug: text(),
  updatedAt: timestamp('updated_at', { precision: 3 }).notNull(),
})

export const collectionGame = pgTable(
  'collection_game',
  {
    id: serial().primaryKey(),
    collectionId: integer('collection_id')
      .notNull()
      .references(() => collection.igdbId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    gameId: integer('game_id')
      .notNull()
      .references(() => game.igdbId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => [
    uniqueIndex('collection_game_collection_id_game_id_key').using(
      'btree',
      table.collectionId.asc().nullsLast(),
      table.gameId.asc().nullsLast(),
    ),
    index('collection_game_game_id_idx').using(
      'btree',
      table.gameId.asc().nullsLast(),
    ),
  ],
)

export const comment = pgTable(
  'Comment',
  {
    displayUsername: text().notNull(),
    listId: integer(),
    reviewId: integer(),
    commentId: integer(),
  },
  (table) => [
    uniqueIndex('Comment_displayUsername_key').using(
      'btree',
      table.displayUsername.asc().nullsLast(),
    ),
  ],
)

export const company = pgTable(
  'company',
  {
    igdbId: integer('igdb_id').primaryKey(),
    name: text().notNull(),
    slug: text(),
    country: text(),
    description: text(),
    foundingDate: timestamp('founding_date', { precision: 3 }),
    url: text(),
    status: companyType(),
    logo: text(),
    updatedAt: timestamp('updated_at', { precision: 3 }).notNull(),
    parentId: integer('parent_id'),
  },
  (table) => [
    foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.igdbId],
      name: 'company_parent_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
  ],
)

export const companyGame = pgTable(
  'company_game',
  {
    id: serial().primaryKey(),
    companyId: integer('company_id')
      .notNull()
      .references(() => company.igdbId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    gameId: integer('game_id')
      .notNull()
      .references(() => game.igdbId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    type: companyGameRelationType().notNull(),
  },
  (table) => [
    uniqueIndex('company_game_company_id_game_id_type_key').using(
      'btree',
      table.companyId.asc().nullsLast(),
      table.gameId.asc().nullsLast(),
      table.type.asc().nullsLast(),
    ),
    index('company_game_game_id_idx').using(
      'btree',
      table.gameId.asc().nullsLast(),
    ),
  ],
)

export const customTag = pgTable(
  'custom_tag',
  {
    value: text().notNull(),
    entryId: integer('entry_id')
      .notNull()
      .references(() => backlogEntry.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    id: serial().primaryKey(),
    slot: tagSlot().notNull(),
  },
  (table) => [
    uniqueIndex('custom_tag_slot_entry_id_key').using(
      'btree',
      table.slot.asc().nullsLast(),
      table.entryId.asc().nullsLast(),
    ),
  ],
)

export const franchise = pgTable('franchise', {
  igdbId: integer('igdb_id').primaryKey(),
  name: text().notNull(),
  slug: text(),
  updatedAt: timestamp('updated_at', { precision: 3 }).notNull(),
})

export const franchiseGame = pgTable(
  'franchise_game',
  {
    id: serial().primaryKey(),
    franchiseId: integer('franchise_id')
      .notNull()
      .references(() => franchise.igdbId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    gameId: integer('game_id')
      .notNull()
      .references(() => game.igdbId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => [
    uniqueIndex('franchise_game_franchise_id_game_id_key').using(
      'btree',
      table.franchiseId.asc().nullsLast(),
      table.gameId.asc().nullsLast(),
    ),
    index('franchise_game_game_id_idx').using(
      'btree',
      table.gameId.asc().nullsLast(),
    ),
  ],
)

export const game = pgTable(
  'game',
  {
    igdbId: integer('igdb_id').primaryKey(),
    name: text().notNull(),
    url: text().notNull(),
    cover: text(),
    storyline: text(),
    summary: text(),
    slug: text().notNull(),
    themes: text().array(),
    genres: text().array(),
    releaseDate: timestamp('release_date', { precision: 3 }),
    engine: text(),
    status: gameStatus(),
    type: gameType(),
    updatedAt: timestamp('updated_at', { precision: 3 }).notNull(),
    banner: text(),
  },
  (table) => [
    uniqueIndex('game_slug_key').using('btree', table.slug.asc().nullsLast()),
  ],
)

export const gameGame = pgTable(
  'game_game',
  {
    id: serial().primaryKey(),
    baseGameId: integer('base_game_id')
      .notNull()
      .references(() => game.igdbId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    relatedGameId: integer('related_game_id')
      .notNull()
      .references(() => game.igdbId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    relationType: gameRelationType('relation_type').notNull(),
  },
  (table) => [
    index('game_game_base_game_id_idx').using(
      'btree',
      table.baseGameId.asc().nullsLast(),
    ),
    uniqueIndex(
      'game_game_base_game_id_related_game_id_relation_type_key',
    ).using(
      'btree',
      table.baseGameId.asc().nullsLast(),
      table.relatedGameId.asc().nullsLast(),
      table.relationType.asc().nullsLast(),
    ),
    index('game_game_related_game_id_idx').using(
      'btree',
      table.relatedGameId.asc().nullsLast(),
    ),
  ],
)

export const genre = pgTable(
  'genre',
  {
    id: serial().primaryKey(),
    name: text().notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => settings.userId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => [
    uniqueIndex('genre_user_id_name_key').using(
      'btree',
      table.userId.asc().nullsLast(),
      table.name.asc().nullsLast(),
    ),
  ],
)

export const languageSupport = pgTable(
  'language_support',
  {
    gameId: integer('game_id')
      .notNull()
      .references(() => game.igdbId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    language: text().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.gameId, table.language],
      name: 'language_support_pkey',
    }),
  ],
)

export const like = pgTable(
  'Like',
  {
    displayUsername: text().notNull(),
    listId: integer(),
    reviewId: integer(),
    commentId: integer(),
  },
  (table) => [
    uniqueIndex('Like_displayUsername_key').using(
      'btree',
      table.displayUsername.asc().nullsLast(),
    ),
  ],
)

export const platform = pgTable('platform', {
  igdbId: integer('igdb_id').primaryKey(),
  slug: text(),
  abbreviation: text(),
  alternativeName: text('alternative_name'),
  name: text().notNull(),
  logo: text(),
  family: text(),
  updatedAt: timestamp('updated_at', { precision: 3 }).notNull(),
})

export const platformGame = pgTable(
  'platform_game',
  {
    id: serial().primaryKey(),
    gameId: integer('game_id')
      .notNull()
      .references(() => game.igdbId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    platformId: integer('platform_id')
      .notNull()
      .references(() => platform.igdbId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => [
    uniqueIndex('platform_game_game_id_platform_id_key').using(
      'btree',
      table.gameId.asc().nullsLast(),
      table.platformId.asc().nullsLast(),
    ),
    index('platform_game_platform_id_idx').using(
      'btree',
      table.platformId.asc().nullsLast(),
    ),
  ],
)

export const priority = pgTable(
  'Priority',
  {
    id: serial().primaryKey(),
    label: text().notNull(),
    level: priorityLevel().notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => settings.userId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => [
    uniqueIndex('Priority_user_id_level_key').using(
      'btree',
      table.userId.asc().nullsLast(),
      table.level.asc().nullsLast(),
    ),
  ],
)

export const review = pgTable(
  'Review',
  {
    id: serial().notNull(),
    gameId: integer()
      .notNull()
      .references(() => game.igdbId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    displayUsername: text()
      .notNull()
      .references(() => user.displayUsername, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    review: text(),
    privacy: privacyStatus().notNull(),
    createdAt: timestamp({ precision: 3 }).notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
    score: integer(),
  },
  (table) => [
    uniqueIndex('Review_gameId_displayUsername_key').using(
      'btree',
      table.gameId.asc().nullsLast(),
      table.displayUsername.asc().nullsLast(),
    ),
  ],
)

export const session = pgTable(
  'session',
  {
    id: text().primaryKey(),
    expiresAt: timestamp({ precision: 3 }).notNull(),
    token: text().notNull(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  },
  (table) => [
    uniqueIndex('session_token_key').using(
      'btree',
      table.token.asc().nullsLast(),
    ),
    index('session_userId_idx').using('btree', table.userId.asc().nullsLast()),
  ],
)

export const settings = pgTable('Settings', {
  userId: text()
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})

export const tagSettings = pgTable(
  'tag_settings',
  {
    id: serial().primaryKey(),
    active: boolean().default(false).notNull(),
    type: tagType().default('TEXT').notNull(),
    label: text().notNull(),
    slot: tagSlot().notNull(),
    presets: text().array().default(sql`ARRAY[]`),
    userId: text('user_id')
      .notNull()
      .references(() => settings.userId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => [
    uniqueIndex('tag_settings_user_id_slot_key').using(
      'btree',
      table.userId.asc().nullsLast(),
      table.slot.asc().nullsLast(),
    ),
  ],
)

export const user = pgTable(
  'user',
  {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean().default(false).notNull(),
    image: text(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
    displayUsername: text(),
    username: text(),
  },
  (table) => [
    uniqueIndex('user_displayUsername_key').using(
      'btree',
      table.displayUsername.asc().nullsLast(),
    ),
    uniqueIndex('user_email_key').using('btree', table.email.asc().nullsLast()),
    uniqueIndex('user_username_key').using(
      'btree',
      table.username.asc().nullsLast(),
    ),
  ],
)

export const verification = pgTable(
  'verification',
  {
    id: text().primaryKey(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp({ precision: 3 }).notNull(),
    createdAt: timestamp({ precision: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3 }).notNull(),
  },
  (table) => [
    index('verification_identifier_idx').using(
      'btree',
      table.identifier.asc().nullsLast(),
    ),
  ],
)

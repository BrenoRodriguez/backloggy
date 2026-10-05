import { defineRelations } from 'drizzle-orm'
import * as schema from './schema'

export const relations = defineRelations(schema, (r) => ({
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },
  user: {
    accounts: r.many.account(),
    backlogEntries: r.many.backlogEntry(),
    games: r.many.game({
      from: r.user.displayUsername.through(r.review.displayUsername),
      to: r.game.igdbId.through(r.review.gameId),
    }),
    sessions: r.many.session(),
    settings: r.many.settings(),
  },
  backlogEntry: {
    game: r.one.game({
      from: r.backlogEntry.gameIgdbId,
      to: r.game.igdbId,
    }),
    platform: r.one.platform({
      from: r.backlogEntry.platformId,
      to: r.platform.igdbId,
    }),
    priority: r.one.priority({
      from: r.backlogEntry.priorityId,
      to: r.priority.id,
    }),
    user: r.one.user({
      from: r.backlogEntry.userId,
      to: r.user.id,
    }),
    genres: r.many.genre({
      from: r.backlogEntry.id.through(r.backlogEntryGenre.backlogEntryId),
      to: r.genre.id.through(r.backlogEntryGenre.genreId),
    }),
    customTags: r.many.customTag(),
  },
  game: {
    backlogEntries: r.many.backlogEntry(),
    collections: r.many.collection(),
    companies: r.many.company(),
    franchises: r.many.franchise(),
    languageSupports: r.many.languageSupport(),
    platforms: r.many.platform({
      from: r.game.igdbId.through(r.platformGame.gameId),
      to: r.platform.igdbId.through(r.platformGame.platformId),
    }),
    users: r.many.user(),
  },
  platform: {
    backlogEntries: r.many.backlogEntry(),
    games: r.many.game(),
  },
  priority: {
    backlogEntries: r.many.backlogEntry(),
    setting: r.one.settings({
      from: r.priority.userId,
      to: r.settings.userId,
    }),
  },
  genre: {
    backlogEntries: r.many.backlogEntry(),
    setting: r.one.settings({
      from: r.genre.userId,
      to: r.settings.userId,
    }),
  },
  collection: {
    games: r.many.game({
      from: r.collection.igdbId.through(r.collectionGame.collectionId),
      to: r.game.igdbId.through(r.collectionGame.gameId),
    }),
  },
  company: {
    company: r.one.company({
      from: r.company.parentId,
      to: r.company.igdbId,
      alias: 'company_parentId_company_igdbId',
    }),
    companies: r.many.company({
      alias: 'company_parentId_company_igdbId',
    }),
    games: r.many.game({
      from: r.company.igdbId.through(r.companyGame.companyId),
      to: r.game.igdbId.through(r.companyGame.gameId),
    }),
  },
  customTag: {
    backlogEntry: r.one.backlogEntry({
      from: r.customTag.entryId,
      to: r.backlogEntry.id,
    }),
  },
  franchise: {
    games: r.many.game({
      from: r.franchise.igdbId.through(r.franchiseGame.franchiseId),
      to: r.game.igdbId.through(r.franchiseGame.gameId),
    }),
  },
  settings: {
    genres: r.many.genre(),
    priorities: r.many.priority(),
    user: r.one.user({
      from: r.settings.userId,
      to: r.user.id,
    }),
    tagSettings: r.many.tagSettings(),
  },
  languageSupport: {
    game: r.one.game({
      from: r.languageSupport.gameId,
      to: r.game.igdbId,
    }),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },
  tagSettings: {
    setting: r.one.settings({
      from: r.tagSettings.userId,
      to: r.settings.userId,
    }),
  },
}))

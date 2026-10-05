-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "CompanyType" AS ENUM('MAIN_COMPANY', 'DIVISION', 'SUBSIDIARY', 'HOLDING_COMPANY', 'SOLO_DEV');--> statement-breakpoint
CREATE TYPE "GameType" AS ENUM('MAIN_GAME', 'DLC', 'EXPANSION', 'BUNDLE', 'STANDALONE_EXPANSION', 'MOD', 'EPISODE', 'SEASON', 'REMAKE', 'REMASTER', 'EXPANDED_GAME', 'PORT', 'FORK', 'PACK_ADDON', 'UPDATE');--> statement-breakpoint
CREATE TYPE "GameStatus" AS ENUM('RELEASED', 'ALPHA', 'BETA', 'EARLY_ACCESS', 'OFFLINE', 'CANCELLED', 'RUMORED', 'DELISTED', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "GameRelationType" AS ENUM('REMAKE', 'REMASTER', 'PORT', 'DLC', 'EXPANSION', 'BUNDLE', 'SIMILAR', 'EXPANDED_VERSION');--> statement-breakpoint
CREATE TYPE "CompanyGameRelationType" AS ENUM('DEVELOPED', 'PUBLISHED');--> statement-breakpoint
CREATE TYPE "BacklogEntryStatus" AS ENUM('BACKLOG', 'PLAYING', 'PLAYED', 'WISHLIST');--> statement-breakpoint
CREATE TYPE "BacklogCompletionStatus" AS ENUM('UNFINISHED', 'BEATEN', 'COMPLETED', 'DROPPED');--> statement-breakpoint
CREATE TYPE "BacklogOwnership" AS ENUM('OWNED', 'NOT_OWNED');--> statement-breakpoint
CREATE TYPE "BacklogCardStatus" AS ENUM('EARLY_ACCESS', 'REGION_LOCKED', 'BEATEN', 'COMPLETED', 'DROPPED', 'WISHLIST', 'BACKLOG', 'PLAYING', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "PrivacyStatus" AS ENUM('PUBLIC', 'FRIENDS_ONLY', 'PRIVATE');--> statement-breakpoint
CREATE TYPE "PriorityLevel" AS ENUM('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN');--> statement-breakpoint
CREATE TYPE "TagType" AS ENUM('NUMBER', 'TEXT', 'LIST', 'DATE');--> statement-breakpoint
CREATE TYPE "TagSlot" AS ENUM('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH');--> statement-breakpoint
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp(3),
	"refreshTokenExpiresAt" timestamp(3),
	"scope" text,
	"password" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "api_token" (
	"provider" text PRIMARY KEY,
	"token" text NOT NULL,
	"expires_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "backlog_entry" (
	"id" serial PRIMARY KEY,
	"user_id" text NOT NULL,
	"platform_id" integer NOT NULL,
	"custom_cover" text,
	"status" "BacklogEntryStatus" NOT NULL,
	"completion_status" "BacklogCompletionStatus" NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"playtime_minutes" integer,
	"priority_id" integer,
	"sort_order" integer NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"custom_name" text,
	"game_igdb_id" integer NOT NULL,
	"end_date" timestamp(3),
	"start_date" timestamp(3),
	"completion_time" integer
);
--> statement-breakpoint
CREATE TABLE "BacklogEntryGenre" (
	"backlogEntryId" integer,
	"genreId" integer,
	CONSTRAINT "BacklogEntryGenre_pkey" PRIMARY KEY("backlogEntryId","genreId")
);
--> statement-breakpoint
CREATE TABLE "collection" (
	"igdb_id" integer PRIMARY KEY,
	"name" text NOT NULL,
	"slug" text,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "collection_game" (
	"id" serial PRIMARY KEY,
	"collection_id" integer NOT NULL,
	"game_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Comment" (
	"displayUsername" text NOT NULL,
	"listId" integer,
	"reviewId" integer,
	"commentId" integer
);
--> statement-breakpoint
CREATE TABLE "company" (
	"igdb_id" integer PRIMARY KEY,
	"name" text NOT NULL,
	"slug" text,
	"country" text,
	"description" text,
	"founding_date" timestamp(3),
	"url" text,
	"status" "CompanyType",
	"logo" text,
	"updated_at" timestamp(3) NOT NULL,
	"parent_id" integer
);
--> statement-breakpoint
CREATE TABLE "company_game" (
	"id" serial PRIMARY KEY,
	"company_id" integer NOT NULL,
	"game_id" integer NOT NULL,
	"type" "CompanyGameRelationType" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "custom_tag" (
	"value" text NOT NULL,
	"entry_id" integer NOT NULL,
	"id" serial PRIMARY KEY,
	"slot" "TagSlot" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "franchise" (
	"igdb_id" integer PRIMARY KEY,
	"name" text NOT NULL,
	"slug" text,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "franchise_game" (
	"id" serial PRIMARY KEY,
	"franchise_id" integer NOT NULL,
	"game_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "game" (
	"igdb_id" integer PRIMARY KEY,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"cover" text,
	"storyline" text,
	"summary" text,
	"slug" text NOT NULL,
	"themes" text[],
	"genres" text[],
	"release_date" timestamp(3),
	"engine" text,
	"status" "GameStatus",
	"type" "GameType",
	"updated_at" timestamp(3) NOT NULL,
	"banner" text
);
--> statement-breakpoint
CREATE TABLE "game_game" (
	"id" serial PRIMARY KEY,
	"base_game_id" integer NOT NULL,
	"related_game_id" integer NOT NULL,
	"relation_type" "GameRelationType" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genre" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "language_support" (
	"game_id" integer,
	"language" text,
	CONSTRAINT "language_support_pkey" PRIMARY KEY("game_id","language")
);
--> statement-breakpoint
CREATE TABLE "Like" (
	"displayUsername" text NOT NULL,
	"listId" integer,
	"reviewId" integer,
	"commentId" integer
);
--> statement-breakpoint
CREATE TABLE "platform" (
	"igdb_id" integer PRIMARY KEY,
	"slug" text,
	"abbreviation" text,
	"alternative_name" text,
	"name" text NOT NULL,
	"logo" text,
	"family" text,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "platform_game" (
	"id" serial PRIMARY KEY,
	"game_id" integer NOT NULL,
	"platform_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Priority" (
	"id" serial PRIMARY KEY,
	"label" text NOT NULL,
	"level" "PriorityLevel" NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Review" (
	"id" serial,
	"gameId" integer NOT NULL,
	"displayUsername" text NOT NULL,
	"review" text,
	"privacy" "PrivacyStatus" NOT NULL,
	"createdAt" timestamp(3) NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"score" integer
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY,
	"expiresAt" timestamp(3) NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Settings" (
	"userId" text PRIMARY KEY
);
--> statement-breakpoint
CREATE TABLE "tag_settings" (
	"id" serial PRIMARY KEY,
	"active" boolean DEFAULT false NOT NULL,
	"type" "TagType" DEFAULT 'TEXT'::"TagType" NOT NULL,
	"label" text NOT NULL,
	"slot" "TagSlot" NOT NULL,
	"presets" text[] DEFAULT ARRAY[]::text[],
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"image" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"displayUsername" text,
	"username" text
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp(3) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "backlog_entry_game_igdb_id_user_id_key" ON "backlog_entry" ("game_igdb_id","user_id");--> statement-breakpoint
CREATE INDEX "BacklogEntryGenre_genreId_idx" ON "BacklogEntryGenre" ("genreId");--> statement-breakpoint
CREATE UNIQUE INDEX "collection_game_collection_id_game_id_key" ON "collection_game" ("collection_id","game_id");--> statement-breakpoint
CREATE INDEX "collection_game_game_id_idx" ON "collection_game" ("game_id");--> statement-breakpoint
CREATE UNIQUE INDEX "Comment_displayUsername_key" ON "Comment" ("displayUsername");--> statement-breakpoint
CREATE UNIQUE INDEX "company_game_company_id_game_id_type_key" ON "company_game" ("company_id","game_id","type");--> statement-breakpoint
CREATE INDEX "company_game_game_id_idx" ON "company_game" ("game_id");--> statement-breakpoint
CREATE UNIQUE INDEX "custom_tag_slot_entry_id_key" ON "custom_tag" ("slot","entry_id");--> statement-breakpoint
CREATE UNIQUE INDEX "franchise_game_franchise_id_game_id_key" ON "franchise_game" ("franchise_id","game_id");--> statement-breakpoint
CREATE INDEX "franchise_game_game_id_idx" ON "franchise_game" ("game_id");--> statement-breakpoint
CREATE INDEX "game_game_base_game_id_idx" ON "game_game" ("base_game_id");--> statement-breakpoint
CREATE UNIQUE INDEX "game_game_base_game_id_related_game_id_relation_type_key" ON "game_game" ("base_game_id","related_game_id","relation_type");--> statement-breakpoint
CREATE INDEX "game_game_related_game_id_idx" ON "game_game" ("related_game_id");--> statement-breakpoint
CREATE UNIQUE INDEX "game_slug_key" ON "game" ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "genre_user_id_name_key" ON "genre" ("user_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX "Like_displayUsername_key" ON "Like" ("displayUsername");--> statement-breakpoint
CREATE UNIQUE INDEX "platform_game_game_id_platform_id_key" ON "platform_game" ("game_id","platform_id");--> statement-breakpoint
CREATE INDEX "platform_game_platform_id_idx" ON "platform_game" ("platform_id");--> statement-breakpoint
CREATE UNIQUE INDEX "Priority_user_id_level_key" ON "Priority" ("user_id","level");--> statement-breakpoint
CREATE UNIQUE INDEX "Review_gameId_displayUsername_key" ON "Review" ("gameId","displayUsername");--> statement-breakpoint
CREATE UNIQUE INDEX "session_token_key" ON "session" ("token");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "tag_settings_user_id_slot_key" ON "tag_settings" ("user_id","slot");--> statement-breakpoint
CREATE UNIQUE INDEX "user_displayUsername_key" ON "user" ("displayUsername");--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_key" ON "user" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "user_username_key" ON "user" ("username");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "company" ADD CONSTRAINT "company_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "company"("igdb_id") ON DELETE SET NULL ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "language_support" ADD CONSTRAINT "language_support_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "game_game" ADD CONSTRAINT "game_game_base_game_id_fkey" FOREIGN KEY ("base_game_id") REFERENCES "game"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "game_game" ADD CONSTRAINT "game_game_related_game_id_fkey" FOREIGN KEY ("related_game_id") REFERENCES "game"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "franchise_game" ADD CONSTRAINT "franchise_game_franchise_id_fkey" FOREIGN KEY ("franchise_id") REFERENCES "franchise"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "franchise_game" ADD CONSTRAINT "franchise_game_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "company_game" ADD CONSTRAINT "company_game_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "company_game" ADD CONSTRAINT "company_game_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "platform_game" ADD CONSTRAINT "platform_game_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "platform_game" ADD CONSTRAINT "platform_game_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platform"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "collection_game" ADD CONSTRAINT "collection_game_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "collection_game" ADD CONSTRAINT "collection_game_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "backlog_entry" ADD CONSTRAINT "backlog_entry_game_igdb_id_fkey" FOREIGN KEY ("game_igdb_id") REFERENCES "game"("igdb_id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "backlog_entry" ADD CONSTRAINT "backlog_entry_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platform"("igdb_id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "backlog_entry" ADD CONSTRAINT "backlog_entry_priority_id_fkey" FOREIGN KEY ("priority_id") REFERENCES "Priority"("id") ON DELETE SET NULL ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "backlog_entry" ADD CONSTRAINT "backlog_entry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "custom_tag" ADD CONSTRAINT "custom_tag_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "backlog_entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Review" ADD CONSTRAINT "Review_displayUsername_fkey" FOREIGN KEY ("displayUsername") REFERENCES "user"("displayUsername") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Review" ADD CONSTRAINT "Review_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("igdb_id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "genre" ADD CONSTRAINT "genre_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Settings"("userId") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Priority" ADD CONSTRAINT "Priority_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Settings"("userId") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "tag_settings" ADD CONSTRAINT "tag_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Settings"("userId") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "BacklogEntryGenre" ADD CONSTRAINT "BacklogEntryGenre_backlogEntryId_fkey" FOREIGN KEY ("backlogEntryId") REFERENCES "backlog_entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "BacklogEntryGenre" ADD CONSTRAINT "BacklogEntryGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
*/
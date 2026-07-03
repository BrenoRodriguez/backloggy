/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `api_token` table. All the data in the column will be lost.
  - Added the required column `expires_at` to the `api_token` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('MAIN_COMPANY', 'DIVISION', 'SUBSIDIARY', 'HOLDING_COMPANY', 'SOLO_DEV');

-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('MAIN_GAME', 'DLC', 'EXPANSION', 'BUNDLE', 'STANDALONE_EXPANSION', 'MOD', 'EPISODE', 'SEASON', 'REMAKE', 'REMASTER', 'EXPANDED_GAME', 'PORT', 'FORK', 'PACK_ADDON', 'UPDATE');

-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('RELEASED', 'ALPHA', 'BETA', 'EARLY_ACCESS', 'OFFLINE', 'CANCELLED', 'RUMORED', 'DELISTED');

-- CreateEnum
CREATE TYPE "LocalizationType" AS ENUM ('INTERFACE', 'AUDIO', 'SUBTITLES');

-- CreateEnum
CREATE TYPE "GameRelationType" AS ENUM ('REMAKE', 'REMASTER', 'PORT', 'DLC', 'EXPANSION', 'BUNDLE', 'SIMILAR', 'EXPANDED_VERSION');

-- CreateEnum
CREATE TYPE "CompanyGameRelationType" AS ENUM ('DEVELOPED', 'PUBLISHED', 'PORTING', 'SUPPORTING');

-- AlterTable
ALTER TABLE "api_token" DROP COLUMN "expiresAt",
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "franchise" (
    "igdb_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "franchise_pkey" PRIMARY KEY ("igdb_id")
);

-- CreateTable
CREATE TABLE "collection" (
    "igdb_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("igdb_id")
);

-- CreateTable
CREATE TABLE "company" (
    "igdb_id" INTEGER NOT NULL,
    "parentId" INTEGER,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "country" TEXT,
    "description" TEXT,
    "founding_date" TIMESTAMP(3),
    "url" TEXT,
    "status" "CompanyType",
    "logo" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("igdb_id")
);

-- CreateTable
CREATE TABLE "platform" (
    "igdb_id" INTEGER NOT NULL,
    "slug" TEXT,
    "abbreviation" TEXT,
    "alternative_name" TEXT,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "family" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_pkey" PRIMARY KEY ("igdb_id")
);

-- CreateTable
CREATE TABLE "game" (
    "igdb_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "cover" TEXT,
    "storyline" TEXT,
    "summary" TEXT,
    "slug" TEXT,
    "themes" TEXT[],
    "genres" TEXT[],
    "release_date" TIMESTAMP(3),
    "engine" TEXT,
    "status" "GameStatus",
    "type" "GameType",
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("igdb_id")
);

-- CreateTable
CREATE TABLE "language_support" (
    "game_id" INTEGER NOT NULL,
    "type" "LocalizationType" NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "language_support_pkey" PRIMARY KEY ("game_id","type","language")
);

-- CreateTable
CREATE TABLE "game_game" (
    "id" SERIAL NOT NULL,
    "base_game_id" INTEGER NOT NULL,
    "related_game_id" INTEGER NOT NULL,
    "relationType" "GameRelationType" NOT NULL,

    CONSTRAINT "game_game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "franchise_game" (
    "id" SERIAL NOT NULL,
    "franchise_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "franchise_game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_game" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "type" "CompanyGameRelationType" NOT NULL,

    CONSTRAINT "company_game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform_game" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "platform_id" INTEGER NOT NULL,

    CONSTRAINT "platform_game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collection_game" (
    "id" SERIAL NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "collection_game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "game_game_base_game_id_idx" ON "game_game"("base_game_id");

-- CreateIndex
CREATE INDEX "game_game_related_game_id_idx" ON "game_game"("related_game_id");

-- CreateIndex
CREATE UNIQUE INDEX "game_game_base_game_id_related_game_id_relationType_key" ON "game_game"("base_game_id", "related_game_id", "relationType");

-- CreateIndex
CREATE INDEX "franchise_game_game_id_idx" ON "franchise_game"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "franchise_game_franchise_id_game_id_key" ON "franchise_game"("franchise_id", "game_id");

-- CreateIndex
CREATE INDEX "company_game_game_id_idx" ON "company_game"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_game_company_id_game_id_type_key" ON "company_game"("company_id", "game_id", "type");

-- CreateIndex
CREATE INDEX "platform_game_platform_id_idx" ON "platform_game"("platform_id");

-- CreateIndex
CREATE UNIQUE INDEX "platform_game_game_id_platform_id_key" ON "platform_game"("game_id", "platform_id");

-- CreateIndex
CREATE INDEX "collection_game_game_id_idx" ON "collection_game"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "collection_game_collection_id_game_id_key" ON "collection_game"("collection_id", "game_id");

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "company"("igdb_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "language_support" ADD CONSTRAINT "language_support_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_game" ADD CONSTRAINT "game_game_base_game_id_fkey" FOREIGN KEY ("base_game_id") REFERENCES "game"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_game" ADD CONSTRAINT "game_game_related_game_id_fkey" FOREIGN KEY ("related_game_id") REFERENCES "game"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "franchise_game" ADD CONSTRAINT "franchise_game_franchise_id_fkey" FOREIGN KEY ("franchise_id") REFERENCES "franchise"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "franchise_game" ADD CONSTRAINT "franchise_game_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_game" ADD CONSTRAINT "company_game_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_game" ADD CONSTRAINT "company_game_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platform_game" ADD CONSTRAINT "platform_game_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platform"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platform_game" ADD CONSTRAINT "platform_game_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_game" ADD CONSTRAINT "collection_game_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_game" ADD CONSTRAINT "collection_game_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("igdb_id") ON DELETE CASCADE ON UPDATE CASCADE;

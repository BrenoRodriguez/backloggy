/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `game` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `game` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "CustomTagType" AS ENUM ('NUMBER', 'TEXT', 'LIST');

-- CreateEnum
CREATE TYPE "BacklogEntryStatus" AS ENUM ('BACKLOG', 'PLAYING', 'PLAYED');

-- CreateEnum
CREATE TYPE "BacklogCompletionStatus" AS ENUM ('UNFINISHED', 'BEATEN', 'COMPLETED', 'DROPPED');

-- CreateEnum
CREATE TYPE "BacklogOwnership" AS ENUM ('OWNED', 'NOT_OWNED');

-- CreateEnum
CREATE TYPE "BacklogCardStatus" AS ENUM ('EARLY_ACCESS', 'REGION_LOCKED', 'BEATEN', 'COMPLETED', 'DROPPED', 'WISHLIST', 'BACKLOG', 'PLAYING');

-- AlterTable
ALTER TABLE "game" ALTER COLUMN "slug" SET NOT NULL;

-- CreateTable
CREATE TABLE "CustomTag" (
    "tagId" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "tagNumber" INTEGER NOT NULL,
    "type" "CustomTagType" NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "CustomTag_pkey" PRIMARY KEY ("tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomTag_tagNumber_gameId_userId_key" ON "CustomTag"("tagNumber", "gameId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "game_slug_key" ON "game"("slug");

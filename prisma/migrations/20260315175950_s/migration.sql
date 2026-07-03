/*
  Warnings:

  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ListEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GameToGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `games` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lists` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LocalizationType" AS ENUM ('INTERFACE', 'AUDIO', 'SUBTITLES');

-- CreateEnum
CREATE TYPE "GameRelationType" AS ENUM ('REMAKE', 'REMASTER', 'PORT', 'DLC', 'EXPANSION', 'BUNDLE', 'SIMILAR', 'EXPANDED_VERSION');

-- DropForeignKey
ALTER TABLE "ListEntry" DROP CONSTRAINT "ListEntry_game_id_fkey";

-- DropForeignKey
ALTER TABLE "ListEntry" DROP CONSTRAINT "ListEntry_list_id_fkey";

-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_GameToGenre" DROP CONSTRAINT "_GameToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameToGenre" DROP CONSTRAINT "_GameToGenre_B_fkey";

-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_user_id_fkey";

-- DropForeignKey
ALTER TABLE "lists" DROP CONSTRAINT "lists_user_id_fkey";

-- DropTable
DROP TABLE "Genre";

-- DropTable
DROP TABLE "ListEntry";

-- DropTable
DROP TABLE "Settings";

-- DropTable
DROP TABLE "_GameToGenre";

-- DropTable
DROP TABLE "games";

-- DropTable
DROP TABLE "lists";

-- DropEnum
DROP TYPE "GameStatus";

-- CreateTable
CREATE TABLE "FranchiseSnapshot" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FranchiseSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionSnapshot" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "CollectionSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanySnapshot" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CompanySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameLocalizationSnapshot" (
    "id" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "type" "LocalizationType" NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "GameLocalizationSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSnapshot" (
    "id" INTEGER NOT NULL,
    "collectionId" INTEGER,
    "name" TEXT NOT NULL,
    "igdbUrl" TEXT NOT NULL,
    "cover" TEXT,
    "storyline" TEXT,
    "summary" TEXT,
    "themes" TEXT[],
    "genres" TEXT[],
    "releaseDate" TIMESTAMP(3),
    "gameEngine" TEXT,
    "gameModes" TEXT[],
    "gameStatus" TEXT NOT NULL,
    "gameType" TEXT NOT NULL,
    "platforms" TEXT[],

    CONSTRAINT "GameSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameRelationSnapshot" (
    "id" SERIAL NOT NULL,
    "baseGameId" INTEGER NOT NULL,
    "relatedGameId" INTEGER NOT NULL,
    "type" "GameRelationType" NOT NULL,

    CONSTRAINT "GameRelationSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FranchiseSnapshotToGameSnapshot" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FranchiseSnapshotToGameSnapshot_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_published" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_published_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_developed" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_developed_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FranchiseSnapshotToGameSnapshot_B_index" ON "_FranchiseSnapshotToGameSnapshot"("B");

-- CreateIndex
CREATE INDEX "_published_B_index" ON "_published"("B");

-- CreateIndex
CREATE INDEX "_developed_B_index" ON "_developed"("B");

-- AddForeignKey
ALTER TABLE "GameLocalizationSnapshot" ADD CONSTRAINT "GameLocalizationSnapshot_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameSnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSnapshot" ADD CONSTRAINT "GameSnapshot_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "CollectionSnapshot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRelationSnapshot" ADD CONSTRAINT "GameRelationSnapshot_baseGameId_fkey" FOREIGN KEY ("baseGameId") REFERENCES "GameSnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRelationSnapshot" ADD CONSTRAINT "GameRelationSnapshot_relatedGameId_fkey" FOREIGN KEY ("relatedGameId") REFERENCES "GameSnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FranchiseSnapshotToGameSnapshot" ADD CONSTRAINT "_FranchiseSnapshotToGameSnapshot_A_fkey" FOREIGN KEY ("A") REFERENCES "FranchiseSnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FranchiseSnapshotToGameSnapshot" ADD CONSTRAINT "_FranchiseSnapshotToGameSnapshot_B_fkey" FOREIGN KEY ("B") REFERENCES "GameSnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_published" ADD CONSTRAINT "_published_A_fkey" FOREIGN KEY ("A") REFERENCES "CompanySnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_published" ADD CONSTRAINT "_published_B_fkey" FOREIGN KEY ("B") REFERENCES "GameSnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_developed" ADD CONSTRAINT "_developed_A_fkey" FOREIGN KEY ("A") REFERENCES "CompanySnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_developed" ADD CONSTRAINT "_developed_B_fkey" FOREIGN KEY ("B") REFERENCES "GameSnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

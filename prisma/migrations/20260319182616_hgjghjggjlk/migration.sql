/*
  Warnings:

  - You are about to drop the `CustomTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[displayUsername]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PrivacyStatus" AS ENUM ('PUBLIC', 'FRIENDS_ONLY', 'PRIVATE');

-- DropTable
DROP TABLE "CustomTag";

-- CreateTable
CREATE TABLE "backlog_entry" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "game_id" INTEGER NOT NULL,
    "platform_id" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "custom_cover" TEXT,
    "status" "BacklogEntryStatus" NOT NULL,
    "completionStatus" "BacklogCompletionStatus" NOT NULL,
    "ownership" "BacklogOwnership" NOT NULL,

    CONSTRAINT "backlog_entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custom_tag" (
    "tagId" SERIAL NOT NULL,
    "backlog_entry_id" INTEGER NOT NULL,
    "tagNumber" INTEGER NOT NULL,
    "type" "CustomTagType" NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "custom_tag_pkey" PRIMARY KEY ("tagId")
);

-- CreateTable
CREATE TABLE "custom_genre" (
    "id" SERIAL NOT NULL,
    "backlog_entry_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "custom_genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "displayUsername" TEXT NOT NULL,
    "score" TEXT,
    "review" TEXT,
    "privacy" "PrivacyStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Comment" (
    "displayUsername" TEXT NOT NULL,
    "listId" INTEGER,
    "reviewId" INTEGER,
    "commentId" INTEGER
);

-- CreateTable
CREATE TABLE "Like" (
    "displayUsername" TEXT NOT NULL,
    "listId" INTEGER,
    "reviewId" INTEGER,
    "commentId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "backlog_entry_game_id_user_id_key" ON "backlog_entry"("game_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "custom_tag_tagNumber_backlog_entry_id_key" ON "custom_tag"("tagNumber", "backlog_entry_id");

-- CreateIndex
CREATE UNIQUE INDEX "custom_genre_backlog_entry_id_name_key" ON "custom_genre"("backlog_entry_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Review_gameId_displayUsername_key" ON "Review"("gameId", "displayUsername");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_displayUsername_key" ON "Comment"("displayUsername");

-- CreateIndex
CREATE UNIQUE INDEX "Like_displayUsername_key" ON "Like"("displayUsername");

-- CreateIndex
CREATE UNIQUE INDEX "user_displayUsername_key" ON "user"("displayUsername");

-- AddForeignKey
ALTER TABLE "backlog_entry" ADD CONSTRAINT "backlog_entry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backlog_entry" ADD CONSTRAINT "backlog_entry_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("igdb_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backlog_entry" ADD CONSTRAINT "backlog_entry_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platform"("igdb_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_tag" ADD CONSTRAINT "custom_tag_backlog_entry_id_fkey" FOREIGN KEY ("backlog_entry_id") REFERENCES "backlog_entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_genre" ADD CONSTRAINT "custom_genre_backlog_entry_id_fkey" FOREIGN KEY ("backlog_entry_id") REFERENCES "backlog_entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("igdb_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_displayUsername_fkey" FOREIGN KEY ("displayUsername") REFERENCES "user"("displayUsername") ON DELETE CASCADE ON UPDATE CASCADE;

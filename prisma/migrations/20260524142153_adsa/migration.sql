/*
  Warnings:

  - You are about to drop the column `game_slug` on the `backlog_entry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[game_igdb_id,user_id]` on the table `backlog_entry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `game_igdb_id` to the `backlog_entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "BacklogEntryStatus" ADD VALUE 'WISHLIST';

-- DropForeignKey
ALTER TABLE "backlog_entry" DROP CONSTRAINT "backlog_entry_game_slug_fkey";

-- DropIndex
DROP INDEX "backlog_entry_game_slug_user_id_key";

-- AlterTable
ALTER TABLE "backlog_entry" DROP COLUMN "game_slug",
ADD COLUMN     "game_igdb_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "backlog_entry_game_igdb_id_user_id_key" ON "backlog_entry"("game_igdb_id", "user_id");

-- AddForeignKey
ALTER TABLE "backlog_entry" ADD CONSTRAINT "backlog_entry_game_igdb_id_fkey" FOREIGN KEY ("game_igdb_id") REFERENCES "game"("igdb_id") ON DELETE RESTRICT ON UPDATE CASCADE;

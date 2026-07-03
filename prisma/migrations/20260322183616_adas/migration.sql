/*
  Warnings:

  - You are about to drop the column `game_id` on the `backlog_entry` table. All the data in the column will be lost.
  - You are about to drop the column `ownership` on the `backlog_entry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[game_slug,user_id]` on the table `backlog_entry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `custom_name` to the `backlog_entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game_slug` to the `backlog_entry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "backlog_entry" DROP CONSTRAINT "backlog_entry_game_id_fkey";

-- DropIndex
DROP INDEX "backlog_entry_game_id_user_id_key";

-- AlterTable
ALTER TABLE "backlog_entry" DROP COLUMN "game_id",
DROP COLUMN "ownership",
ADD COLUMN     "custom_name" TEXT NOT NULL,
ADD COLUMN     "finished_on" TIMESTAMP(3),
ADD COLUMN     "game_slug" TEXT NOT NULL,
ADD COLUMN     "started_on" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "game" ADD COLUMN     "banner" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "backlog_entry_game_slug_user_id_key" ON "backlog_entry"("game_slug", "user_id");

-- AddForeignKey
ALTER TABLE "backlog_entry" ADD CONSTRAINT "backlog_entry_game_slug_fkey" FOREIGN KEY ("game_slug") REFERENCES "game"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

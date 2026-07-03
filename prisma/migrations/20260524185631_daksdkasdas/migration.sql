/*
  Warnings:

  - You are about to drop the column `settings_user_id` on the `Priority` table. All the data in the column will be lost.
  - You are about to drop the column `settings_user_id` on the `genre` table. All the data in the column will be lost.
  - You are about to drop the column `settings_user_id` on the `tag_settings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,level]` on the table `Priority` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,name]` on the table `genre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,slot]` on the table `tag_settings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Priority` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `genre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tag_settings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Priority" DROP CONSTRAINT "Priority_settings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "genre" DROP CONSTRAINT "genre_settings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tag_settings" DROP CONSTRAINT "tag_settings_settings_user_id_fkey";

-- DropIndex
DROP INDEX "Priority_settings_user_id_level_key";

-- DropIndex
DROP INDEX "genre_settings_user_id_name_key";

-- DropIndex
DROP INDEX "tag_settings_settings_user_id_slot_key";

-- AlterTable
ALTER TABLE "Priority" DROP COLUMN "settings_user_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "genre" DROP COLUMN "settings_user_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tag_settings" DROP COLUMN "settings_user_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Priority_user_id_level_key" ON "Priority"("user_id", "level");

-- CreateIndex
CREATE UNIQUE INDEX "genre_user_id_name_key" ON "genre"("user_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_settings_user_id_slot_key" ON "tag_settings"("user_id", "slot");

-- AddForeignKey
ALTER TABLE "genre" ADD CONSTRAINT "genre_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Settings"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Priority" ADD CONSTRAINT "Priority_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Settings"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_settings" ADD CONSTRAINT "tag_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Settings"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

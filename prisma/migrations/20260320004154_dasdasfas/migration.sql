/*
  Warnings:

  - You are about to drop the column `completionStatus` on the `backlog_entry` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `backlog_entry` table. All the data in the column will be lost.
  - The primary key for the `custom_tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `backlog_entry_id` on the `custom_tag` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `custom_tag` table. All the data in the column will be lost.
  - You are about to drop the column `tagNumber` on the `custom_tag` table. All the data in the column will be lost.
  - You are about to drop the `custom_genre` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slot,entry_id]` on the table `custom_tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `completion_status` to the `backlog_entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `backlog_entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sort_order` to the `backlog_entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `backlog_entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entry_id` to the `custom_tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slot` to the `custom_tag` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `custom_tag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PriorityLevel" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN');

-- CreateEnum
CREATE TYPE "TagType" AS ENUM ('NUMBER', 'TEXT', 'LIST', 'DATE');

-- CreateEnum
CREATE TYPE "TagSlot" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH');

-- DropForeignKey
ALTER TABLE "custom_genre" DROP CONSTRAINT "custom_genre_backlog_entry_id_fkey";

-- DropForeignKey
ALTER TABLE "custom_tag" DROP CONSTRAINT "custom_tag_backlog_entry_id_fkey";

-- DropIndex
DROP INDEX "custom_tag_tagNumber_backlog_entry_id_key";

-- AlterTable
ALTER TABLE "backlog_entry" DROP COLUMN "completionStatus",
DROP COLUMN "position",
ADD COLUMN     "completion_status" "BacklogCompletionStatus" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "playtime_minutes" INTEGER,
ADD COLUMN     "priority_id" INTEGER,
ADD COLUMN     "sort_order" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "custom_tag" DROP CONSTRAINT "custom_tag_pkey",
DROP COLUMN "backlog_entry_id",
DROP COLUMN "tagId",
DROP COLUMN "tagNumber",
ADD COLUMN     "entry_id" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "slot" "TagSlot" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "TagType" NOT NULL,
ADD CONSTRAINT "custom_tag_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "custom_genre";

-- DropEnum
DROP TYPE "CustomTagType";

-- CreateTable
CREATE TABLE "Settings" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" SERIAL NOT NULL,
    "settings_user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Priority" (
    "id" SERIAL NOT NULL,
    "settings_user_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "level" "PriorityLevel" NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Priority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_settings" (
    "id" SERIAL NOT NULL,
    "settings_user_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "type" "TagType" NOT NULL DEFAULT 'TEXT',
    "label" TEXT NOT NULL,
    "slot" "TagSlot" NOT NULL,
    "presets" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "tag_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BacklogEntryToGenre" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BacklogEntryToGenre_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "genre_settings_user_id_name_key" ON "genre"("settings_user_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_settings_settings_user_id_slot_key" ON "tag_settings"("settings_user_id", "slot");

-- CreateIndex
CREATE INDEX "_BacklogEntryToGenre_B_index" ON "_BacklogEntryToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "custom_tag_slot_entry_id_key" ON "custom_tag"("slot", "entry_id");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genre" ADD CONSTRAINT "genre_settings_user_id_fkey" FOREIGN KEY ("settings_user_id") REFERENCES "Settings"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Priority" ADD CONSTRAINT "Priority_settings_user_id_fkey" FOREIGN KEY ("settings_user_id") REFERENCES "Settings"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Priority" ADD CONSTRAINT "Priority_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_settings" ADD CONSTRAINT "tag_settings_settings_user_id_fkey" FOREIGN KEY ("settings_user_id") REFERENCES "Settings"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backlog_entry" ADD CONSTRAINT "backlog_entry_priority_id_fkey" FOREIGN KEY ("priority_id") REFERENCES "Priority"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_tag" ADD CONSTRAINT "custom_tag_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "backlog_entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BacklogEntryToGenre" ADD CONSTRAINT "_BacklogEntryToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "backlog_entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BacklogEntryToGenre" ADD CONSTRAINT "_BacklogEntryToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `language_support` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `type` on the `language_support` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "language_support" DROP CONSTRAINT "language_support_pkey",
DROP COLUMN "type",
ADD CONSTRAINT "language_support_pkey" PRIMARY KEY ("game_id", "language");

-- DropEnum
DROP TYPE "LocalizationType";

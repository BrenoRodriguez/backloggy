/*
  Warnings:

  - You are about to drop the column `length` on the `backlog_entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "backlog_entry" DROP COLUMN "length",
ADD COLUMN     "completion_time" INTEGER;

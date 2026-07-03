/*
  Warnings:

  - You are about to drop the column `finished_on` on the `backlog_entry` table. All the data in the column will be lost.
  - You are about to drop the column `started_on` on the `backlog_entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "backlog_entry" DROP COLUMN "finished_on",
DROP COLUMN "started_on",
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "start_date" TIMESTAMP(3),
ALTER COLUMN "custom_name" DROP NOT NULL;

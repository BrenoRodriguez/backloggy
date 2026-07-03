/*
  Warnings:

  - You are about to drop the column `type` on the `custom_tag` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "TagSlot" ADD VALUE 'FIFTH';

-- AlterTable
ALTER TABLE "custom_tag" DROP COLUMN "type";

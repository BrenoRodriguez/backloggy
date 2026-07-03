/*
  Warnings:

  - You are about to drop the column `userId` on the `Priority` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Priority" DROP CONSTRAINT "Priority_userId_fkey";

-- AlterTable
ALTER TABLE "Priority" DROP COLUMN "userId";

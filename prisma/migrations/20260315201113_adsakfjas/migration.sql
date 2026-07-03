/*
  Warnings:

  - You are about to drop the column `changedCompanyId` on the `CompanySnapshot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CompanySnapshot" DROP COLUMN "changedCompanyId",
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "country" SET DATA TYPE TEXT,
ALTER COLUMN "logoUrl" DROP NOT NULL;

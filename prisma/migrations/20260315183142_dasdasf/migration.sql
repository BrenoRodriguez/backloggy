/*
  Warnings:

  - Added the required column `country` to the `CompanySnapshot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoUrl` to the `CompanySnapshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompanySnapshot" ADD COLUMN     "changedCompanyId" INTEGER,
ADD COLUMN     "country" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "logoUrl" TEXT NOT NULL,
ADD COLUMN     "status" TEXT,
ALTER COLUMN "foundingDate" DROP NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ApiToken" (
    "provider" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiToken_pkey" PRIMARY KEY ("provider")
);

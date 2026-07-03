/*
  Warnings:

  - You are about to drop the `ApiToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CollectionSnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanyGameRelation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanySnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FranchiseSnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameLocalizationSnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameRelationSnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameSnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FranchiseSnapshotToGameSnapshot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompanyGameRelation" DROP CONSTRAINT "CompanyGameRelation_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyGameRelation" DROP CONSTRAINT "CompanyGameRelation_gameId_fkey";

-- DropForeignKey
ALTER TABLE "CompanySnapshot" DROP CONSTRAINT "CompanySnapshot_parentId_fkey";

-- DropForeignKey
ALTER TABLE "GameLocalizationSnapshot" DROP CONSTRAINT "GameLocalizationSnapshot_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameRelationSnapshot" DROP CONSTRAINT "GameRelationSnapshot_baseGameId_fkey";

-- DropForeignKey
ALTER TABLE "GameRelationSnapshot" DROP CONSTRAINT "GameRelationSnapshot_relatedGameId_fkey";

-- DropForeignKey
ALTER TABLE "GameSnapshot" DROP CONSTRAINT "GameSnapshot_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "_FranchiseSnapshotToGameSnapshot" DROP CONSTRAINT "_FranchiseSnapshotToGameSnapshot_A_fkey";

-- DropForeignKey
ALTER TABLE "_FranchiseSnapshotToGameSnapshot" DROP CONSTRAINT "_FranchiseSnapshotToGameSnapshot_B_fkey";

-- DropTable
DROP TABLE "ApiToken";

-- DropTable
DROP TABLE "CollectionSnapshot";

-- DropTable
DROP TABLE "CompanyGameRelation";

-- DropTable
DROP TABLE "CompanySnapshot";

-- DropTable
DROP TABLE "FranchiseSnapshot";

-- DropTable
DROP TABLE "GameLocalizationSnapshot";

-- DropTable
DROP TABLE "GameRelationSnapshot";

-- DropTable
DROP TABLE "GameSnapshot";

-- DropTable
DROP TABLE "_FranchiseSnapshotToGameSnapshot";

-- DropEnum
DROP TYPE "CompanyGameRelationType";

-- DropEnum
DROP TYPE "GameRelationType";

-- DropEnum
DROP TYPE "LocalizationType";

-- CreateTable
CREATE TABLE "api_token" (
    "provider" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "api_token_pkey" PRIMARY KEY ("provider")
);

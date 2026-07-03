/*
  Warnings:

  - You are about to drop the `_developed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_published` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CompanyGameRelationType" AS ENUM ('DEVELOPED', 'PUBLISHED');

-- DropForeignKey
ALTER TABLE "_developed" DROP CONSTRAINT "_developed_A_fkey";

-- DropForeignKey
ALTER TABLE "_developed" DROP CONSTRAINT "_developed_B_fkey";

-- DropForeignKey
ALTER TABLE "_published" DROP CONSTRAINT "_published_A_fkey";

-- DropForeignKey
ALTER TABLE "_published" DROP CONSTRAINT "_published_B_fkey";

-- DropTable
DROP TABLE "_developed";

-- DropTable
DROP TABLE "_published";

-- CreateTable
CREATE TABLE "CompanyGameRelation" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "type" "CompanyGameRelationType" NOT NULL,

    CONSTRAINT "CompanyGameRelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyGameRelation_companyId_gameId_type_key" ON "CompanyGameRelation"("companyId", "gameId", "type");

-- AddForeignKey
ALTER TABLE "CompanyGameRelation" ADD CONSTRAINT "CompanyGameRelation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "CompanySnapshot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyGameRelation" ADD CONSTRAINT "CompanyGameRelation_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameSnapshot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

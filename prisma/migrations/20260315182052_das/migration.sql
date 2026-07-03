/*
  Warnings:

  - Added the required column `foundingDate` to the `CompanySnapshot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `CompanySnapshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompanySnapshot" ADD COLUMN     "foundingDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "parentId" INTEGER,
ADD COLUMN     "url" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CompanySnapshot" ADD CONSTRAINT "CompanySnapshot_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "CompanySnapshot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

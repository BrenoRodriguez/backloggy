/*
  Warnings:

  - The values [PORTING,SUPPORTING] on the enum `CompanyGameRelationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `parentId` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `relationType` on the `game_game` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[base_game_id,related_game_id,relation_type]` on the table `game_game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `relation_type` to the `game_game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CompanyGameRelationType_new" AS ENUM ('DEVELOPED', 'PUBLISHED');
ALTER TABLE "company_game" ALTER COLUMN "type" TYPE "CompanyGameRelationType_new" USING ("type"::text::"CompanyGameRelationType_new");
ALTER TYPE "CompanyGameRelationType" RENAME TO "CompanyGameRelationType_old";
ALTER TYPE "CompanyGameRelationType_new" RENAME TO "CompanyGameRelationType";
DROP TYPE "public"."CompanyGameRelationType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_parentId_fkey";

-- DropIndex
DROP INDEX "game_game_base_game_id_related_game_id_relationType_key";

-- AlterTable
ALTER TABLE "company" DROP COLUMN "parentId",
ADD COLUMN     "parent_id" INTEGER;

-- AlterTable
ALTER TABLE "game_game" DROP COLUMN "relationType",
ADD COLUMN     "relation_type" "GameRelationType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "game_game_base_game_id_related_game_id_relation_type_key" ON "game_game"("base_game_id", "related_game_id", "relation_type");

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "company"("igdb_id") ON DELETE SET NULL ON UPDATE CASCADE;

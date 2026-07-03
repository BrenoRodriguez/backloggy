/*
  Warnings:

  - You are about to drop the `_BacklogEntryToGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BacklogEntryToGenre" DROP CONSTRAINT "_BacklogEntryToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_BacklogEntryToGenre" DROP CONSTRAINT "_BacklogEntryToGenre_B_fkey";

-- DropTable
DROP TABLE "_BacklogEntryToGenre";

-- CreateTable
CREATE TABLE "BacklogEntryGenre" (
    "backlogEntryId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "BacklogEntryGenre_pkey" PRIMARY KEY ("backlogEntryId","genreId")
);

-- CreateIndex
CREATE INDEX "BacklogEntryGenre_genreId_idx" ON "BacklogEntryGenre"("genreId");

-- AddForeignKey
ALTER TABLE "BacklogEntryGenre" ADD CONSTRAINT "BacklogEntryGenre_backlogEntryId_fkey" FOREIGN KEY ("backlogEntryId") REFERENCES "backlog_entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BacklogEntryGenre" ADD CONSTRAINT "BacklogEntryGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

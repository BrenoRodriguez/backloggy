/*
  Warnings:

  - A unique constraint covering the columns `[settings_user_id,level]` on the table `Priority` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Priority_settings_user_id_level_key" ON "Priority"("settings_user_id", "level");

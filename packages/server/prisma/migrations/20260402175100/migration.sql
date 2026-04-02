/*
  Warnings:

  - A unique constraint covering the columns `[index]` on the table `Level` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `index` to the `Level` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Level" ADD COLUMN     "index" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Level_index_key" ON "Level"("index");

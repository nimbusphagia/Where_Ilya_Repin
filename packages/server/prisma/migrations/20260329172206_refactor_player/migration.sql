/*
  Warnings:

  - You are about to drop the column `email` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Player_email_key";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "playerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "email",
DROP COLUMN "password";

-- CreateIndex
CREATE UNIQUE INDEX "Player_username_key" ON "Player"("username");

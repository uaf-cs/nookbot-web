/*
  Warnings:

  - A unique constraint covering the columns `[discordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discordId" BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_discordId_fkey" FOREIGN KEY ("discordId") REFERENCES "DiscordUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

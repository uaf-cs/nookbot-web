/*
  Warnings:

  - Added the required column `accessToken` to the `DiscordUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `DiscordUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiscordUser" ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "refreshToken" TEXT NOT NULL;

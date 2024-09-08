/*
  Warnings:

  - You are about to drop the column `steamid64` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `refreshToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "user_steamid64_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "steamid64";

-- DropTable
DROP TABLE "refreshToken";

-- DropTable
DROP TABLE "verificationToken";

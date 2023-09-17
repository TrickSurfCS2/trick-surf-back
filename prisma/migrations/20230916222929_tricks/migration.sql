/*
  Warnings:

  - The primary key for the `RefreshToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `RefreshToken` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `birthDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dismissalDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `employmentDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `VerificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `VerificationToken` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[steamid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[steamid64]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `userId` on the `RefreshToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `steamid` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `steamid64` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usename` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `VerificationToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "User_login_key";

-- DropIndex
DROP INDEX "User_password_key";

-- AlterTable
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "birthDate",
DROP COLUMN "dismissalDate",
DROP COLUMN "employmentDate",
DROP COLUMN "login",
DROP COLUMN "password",
ADD COLUMN     "steamid" TEXT NOT NULL,
ADD COLUMN     "steamid64" TEXT NOT NULL,
ADD COLUMN     "usename" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Complete" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "trickId" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Complete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trick" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "velocity" BOOLEAN NOT NULL,
    "authorId" INTEGER NOT NULL,
    "mapId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Map" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trigger" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "coords" DOUBLE PRECISION[],
    "mapId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Complete_id_key" ON "Complete"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Trick_id_key" ON "Trick"("id");

-- CreateIndex
CREATE INDEX "Trick_authorId_idx" ON "Trick"("authorId");

-- CreateIndex
CREATE INDEX "Trick_mapId_idx" ON "Trick"("mapId");

-- CreateIndex
CREATE UNIQUE INDEX "Map_id_key" ON "Map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_id_key" ON "Trigger"("id");

-- CreateIndex
CREATE INDEX "Trigger_mapId_idx" ON "Trigger"("mapId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_id_key" ON "RefreshToken"("id");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_steamid_key" ON "User"("steamid");

-- CreateIndex
CREATE UNIQUE INDEX "User_steamid64_key" ON "User"("steamid64");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_id_key" ON "VerificationToken"("id");

-- CreateIndex
CREATE INDEX "VerificationToken_userId_idx" ON "VerificationToken"("userId");

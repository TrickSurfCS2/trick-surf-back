/*
  Warnings:

  - You are about to drop the `Complete` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GqlMetric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Map` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trick` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trigger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Complete";

-- DropTable
DROP TABLE "Map";

-- DropTable
DROP TABLE "RefreshToken";

-- DropTable
DROP TABLE "Trick";

-- DropTable
DROP TABLE "Trigger";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "refreshToken" (
    "id" SERIAL NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "steamid" TEXT NOT NULL,
    "steamid64" TEXT NOT NULL,
    "usename" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complete" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "trickId" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "complete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trick" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "velocity" BOOLEAN NOT NULL,
    "authorId" INTEGER NOT NULL,
    "mapId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "map" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trigger" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "coords" DOUBLE PRECISION[],
    "mapId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trigger_pkey" PRIMARY KEY ("id")
);


-- CreateIndex
CREATE UNIQUE INDEX "refreshToken_id_key" ON "refreshToken"("id");

-- CreateIndex
CREATE INDEX "refreshToken_userId_idx" ON "refreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "verificationToken_id_key" ON "verificationToken"("id");

-- CreateIndex
CREATE INDEX "verificationToken_userId_idx" ON "verificationToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_steamid_key" ON "user"("steamid");

-- CreateIndex
CREATE UNIQUE INDEX "user_steamid64_key" ON "user"("steamid64");

-- CreateIndex
CREATE UNIQUE INDEX "complete_id_key" ON "complete"("id");

-- CreateIndex
CREATE UNIQUE INDEX "trick_id_key" ON "trick"("id");

-- CreateIndex
CREATE INDEX "trick_authorId_idx" ON "trick"("authorId");

-- CreateIndex
CREATE INDEX "trick_mapId_idx" ON "trick"("mapId");

-- CreateIndex
CREATE UNIQUE INDEX "map_id_key" ON "map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "trigger_id_key" ON "trigger"("id");

-- CreateIndex
CREATE INDEX "trigger_mapId_idx" ON "trigger"("mapId");

-- CreateIndex
CREATE UNIQUE INDEX "gqlMetric_id_key" ON "gqlMetric"("id");

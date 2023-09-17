/*
  Warnings:

  - You are about to drop the column `velocity` on the `trick` table. All the data in the column will be lost.
  - Added the required column `startType` to the `trick` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trick" DROP COLUMN "velocity",
ADD COLUMN     "startType" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "trigger" ALTER COLUMN "coords" SET DEFAULT ARRAY[]::DOUBLE PRECISION[];

-- CreateTable
CREATE TABLE "route" (
    "id" SERIAL NOT NULL,
    "trickId" INTEGER NOT NULL,
    "triggerId" INTEGER NOT NULL,

    CONSTRAINT "route_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "route_id_key" ON "route"("id");

-- CreateIndex
CREATE INDEX "route_trickId_idx" ON "route"("trickId");

-- CreateIndex
CREATE INDEX "route_triggerId_idx" ON "route"("triggerId");

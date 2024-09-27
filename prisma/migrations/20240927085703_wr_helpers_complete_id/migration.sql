/*
  Warnings:

  - Added the required column `completeId` to the `speed_wr` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completeId` to the `time_wr` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "speed_wr" ADD COLUMN     "completeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "time_wr" ADD COLUMN     "completeId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "speed_wr_completeId_idx" ON "speed_wr"("completeId");

-- CreateIndex
CREATE INDEX "time_wr_completeId_idx" ON "time_wr"("completeId");

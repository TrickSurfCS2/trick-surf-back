/*
  Warnings:

  - A unique constraint covering the columns `[trickId]` on the table `speed_wr` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[trickId]` on the table `time_wr` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "speed_wr_trickId_key" ON "speed_wr"("trickId");

-- CreateIndex
CREATE UNIQUE INDEX "time_wr_trickId_key" ON "time_wr"("trickId");

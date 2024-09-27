-- CreateTable
CREATE TABLE "time_wr" (
    "id" SERIAL NOT NULL,
    "trickId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "time_wr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speed_wr" (
    "id" SERIAL NOT NULL,
    "trickId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "speed_wr_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "time_wr_id_key" ON "time_wr"("id");

-- CreateIndex
CREATE INDEX "time_wr_trickId_idx" ON "time_wr"("trickId");

-- CreateIndex
CREATE UNIQUE INDEX "speed_wr_id_key" ON "speed_wr"("id");

-- CreateIndex
CREATE INDEX "speed_wr_trickId_idx" ON "speed_wr"("trickId");

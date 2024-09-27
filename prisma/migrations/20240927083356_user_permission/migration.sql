-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('UpdateTrick', 'CreateTrick', 'DeleteTrick', 'BanUser', 'Teleport');

-- CreateTable
CREATE TABLE "user_permission" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "permission" "Permission" NOT NULL,

    CONSTRAINT "user_permission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_permission_id_key" ON "user_permission"("id");

-- CreateIndex
CREATE INDEX "user_permission_userId_idx" ON "user_permission"("userId");

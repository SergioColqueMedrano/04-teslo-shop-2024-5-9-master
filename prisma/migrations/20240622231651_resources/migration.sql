/*
  Warnings:

  - The `resources` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "resources",
ADD COLUMN     "resources" INTEGER NOT NULL DEFAULT 1000;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resources" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "workerCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "benefits" TEXT NOT NULL,
    "unlocked" BOOLEAN NOT NULL DEFAULT false,
    "isResourceExtractor" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBuilding" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "buildingId" INTEGER NOT NULL,
    "location" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "workers" INTEGER NOT NULL DEFAULT 0,
    "resourceExtracted" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserBuilding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instance" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "location" JSONB NOT NULL,

    CONSTRAINT "Instance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBuilding" ADD CONSTRAINT "UserBuilding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBuilding" ADD CONSTRAINT "UserBuilding_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instance" ADD CONSTRAINT "Instance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

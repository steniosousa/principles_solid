/*
  Warnings:

  - You are about to drop the column `room` on the `Clinic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Clinic" DROP COLUMN "room";

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "firstAccess" BOOLEAN NOT NULL DEFAULT true;

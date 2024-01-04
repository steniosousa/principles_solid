/*
  Warnings:

  - Added the required column `room` to the `Clinic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clinic" ADD COLUMN     "room" INTEGER NOT NULL;

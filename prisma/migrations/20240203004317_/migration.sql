/*
  Warnings:

  - Added the required column `bio` to the `Clinic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clinic" ADD COLUMN     "bio" TEXT NOT NULL;

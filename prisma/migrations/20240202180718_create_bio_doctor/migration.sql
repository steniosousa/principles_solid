/*
  Warnings:

  - Added the required column `bio` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "bio" TEXT NOT NULL;

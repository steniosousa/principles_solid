/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Clinic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Clinic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clinic" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_email_key" ON "Clinic"("email");

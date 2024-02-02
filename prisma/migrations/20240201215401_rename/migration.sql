/*
  Warnings:

  - You are about to drop the column `ClinicId` on the `Services` table. All the data in the column will be lost.
  - Added the required column `clinicId` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_ClinicId_fkey";

-- AlterTable
ALTER TABLE "Services" DROP COLUMN "ClinicId",
ADD COLUMN     "clinicId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

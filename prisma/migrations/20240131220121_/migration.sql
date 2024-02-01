/*
  Warnings:

  - You are about to drop the column `addresId` on the `Clinic` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `Clinic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Clinic" DROP CONSTRAINT "Clinic_addresId_fkey";

-- AlterTable
ALTER TABLE "Clinic" DROP COLUMN "addresId",
ADD COLUMN     "addressId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Clinic" ADD CONSTRAINT "Clinic_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

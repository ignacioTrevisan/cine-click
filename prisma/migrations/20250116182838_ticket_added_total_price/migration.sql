/*
  Warnings:

  - Added the required column `totalPrice` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "totalPrice" DECIMAL(65,30) NOT NULL;

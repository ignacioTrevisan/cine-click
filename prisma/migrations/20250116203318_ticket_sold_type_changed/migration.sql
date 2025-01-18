/*
  Warnings:

  - The `TicketSold` column on the `MovieTransmition` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MovieTransmition" DROP COLUMN "TicketSold",
ADD COLUMN     "TicketSold" INTEGER NOT NULL DEFAULT 0;

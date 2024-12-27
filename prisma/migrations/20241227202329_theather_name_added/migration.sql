/*
  Warnings:

  - Added the required column `name` to the `MovieTheater` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovieTheater" ADD COLUMN     "name" TEXT NOT NULL;

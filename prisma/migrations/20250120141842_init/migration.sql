/*
  Warnings:

  - Added the required column `imageUrl` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "imageUrl" VARCHAR(255) NOT NULL,
ADD COLUMN     "shortDescription" TEXT NOT NULL;

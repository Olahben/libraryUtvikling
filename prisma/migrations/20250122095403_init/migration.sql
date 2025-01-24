/*
  Warnings:

  - You are about to drop the column `genreId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `thematicKeywordId` on the `Book` table. All the data in the column will be lost.
  - Added the required column `genre` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "genreId",
DROP COLUMN "thematicKeywordId",
ADD COLUMN     "genre" VARCHAR(255) NOT NULL,
ADD COLUMN     "thematicKeywords" TEXT[];

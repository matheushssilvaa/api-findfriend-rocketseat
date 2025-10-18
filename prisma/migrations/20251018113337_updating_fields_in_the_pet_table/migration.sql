/*
  Warnings:

  - You are about to drop the column `decricao` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "decricao",
ADD COLUMN     "descricao" TEXT;

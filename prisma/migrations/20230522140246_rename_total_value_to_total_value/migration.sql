/*
  Warnings:

  - You are about to drop the column `total_value` on the `bill` table. All the data in the column will be lost.
  - Added the required column `totalValue` to the `bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bill` DROP COLUMN `total_value`,
    ADD COLUMN `totalValue` INTEGER NOT NULL;

/*
  Warnings:

  - You are about to drop the column `paymentMethodId` on the `bill` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `bill_paymentMethodId_fkey` ON `bill`;

-- AlterTable
ALTER TABLE `bill` DROP COLUMN `paymentMethodId`;

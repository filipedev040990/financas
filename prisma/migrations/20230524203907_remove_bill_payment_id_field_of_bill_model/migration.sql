/*
  Warnings:

  - You are about to drop the column `billPaymentId` on the `bill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `bill` DROP FOREIGN KEY `bill_billPaymentId_fkey`;

-- DropIndex
DROP INDEX `bill_payment_billId_fkey` ON `bill_payment`;

-- AlterTable
ALTER TABLE `bill` DROP COLUMN `billPaymentId`;

-- AddForeignKey
ALTER TABLE `bill_payment` ADD CONSTRAINT `bill_payment_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `bill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

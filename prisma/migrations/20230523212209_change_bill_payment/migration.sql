/*
  Warnings:

  - Added the required column `billPaymentId` to the `bill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bill_payment` DROP FOREIGN KEY `bill_payment_billId_fkey`;

-- AlterTable
ALTER TABLE `bill` ADD COLUMN `billPaymentId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `bill` ADD CONSTRAINT `bill_billPaymentId_fkey` FOREIGN KEY (`billPaymentId`) REFERENCES `bill_payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

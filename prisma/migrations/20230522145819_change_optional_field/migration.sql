/*
  Warnings:

  - Made the column `interest` on table `bill_payment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `paymentMethodId` on table `bill_payment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `bill_payment` DROP FOREIGN KEY `bill_payment_paymentMethodId_fkey`;

-- AlterTable
ALTER TABLE `bill_payment` MODIFY `interest` INTEGER NOT NULL,
    MODIFY `paymentMethodId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `bill_payment` ADD CONSTRAINT `bill_payment_paymentMethodId_fkey` FOREIGN KEY (`paymentMethodId`) REFERENCES `payment_methods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

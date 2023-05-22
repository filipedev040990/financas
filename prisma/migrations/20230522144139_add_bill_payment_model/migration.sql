/*
  Warnings:

  - You are about to drop the column `paymentMethodId` on the `bill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `bill` DROP FOREIGN KEY `bill_paymentMethodId_fkey`;

-- AlterTable
ALTER TABLE `bill` DROP COLUMN `paymentMethodId`,
    ADD COLUMN `paymentMethodId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `BillPayment` (
    `id` VARCHAR(191) NOT NULL,
    `billId` VARCHAR(191) NOT NULL,
    `totalValue` INTEGER NOT NULL,
    `interest` INTEGER NULL,
    `discount` INTEGER NOT NULL,
    `paymentMethodId` VARCHAR(191) NULL,
    `reversed` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bill` ADD CONSTRAINT `bill_paymentMethodId_fkey` FOREIGN KEY (`paymentMethodId`) REFERENCES `payment_methods`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillPayment` ADD CONSTRAINT `BillPayment_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `bill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillPayment` ADD CONSTRAINT `BillPayment_paymentMethodId_fkey` FOREIGN KEY (`paymentMethodId`) REFERENCES `payment_methods`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

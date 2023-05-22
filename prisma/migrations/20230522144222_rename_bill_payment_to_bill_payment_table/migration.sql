/*
  Warnings:

  - You are about to drop the `BillPayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `BillPayment` DROP FOREIGN KEY `BillPayment_billId_fkey`;

-- DropForeignKey
ALTER TABLE `BillPayment` DROP FOREIGN KEY `BillPayment_paymentMethodId_fkey`;

-- DropTable
DROP TABLE `BillPayment`;

-- CreateTable
CREATE TABLE `bill_payment` (
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
ALTER TABLE `bill_payment` ADD CONSTRAINT `bill_payment_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `bill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bill_payment` ADD CONSTRAINT `bill_payment_paymentMethodId_fkey` FOREIGN KEY (`paymentMethodId`) REFERENCES `payment_methods`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

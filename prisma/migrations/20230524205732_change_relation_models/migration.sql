/*
  Warnings:

  - A unique constraint covering the columns `[billId]` on the table `bill_payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `bill_payment_billId_key` ON `bill_payment`(`billId`);

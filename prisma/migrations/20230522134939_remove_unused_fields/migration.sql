/*
  Warnings:

  - You are about to drop the column `discount` on the `bill` table. All the data in the column will be lost.
  - You are about to drop the column `interest` on the `bill` table. All the data in the column will be lost.
  - You are about to drop the column `accessToken` on the `users` table. All the data in the column will be lost.
  - Added the required column `access_token` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bill` DROP COLUMN `discount`,
    DROP COLUMN `interest`,
    MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `accessToken`,
    ADD COLUMN `access_token` LONGTEXT NOT NULL;

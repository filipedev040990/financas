/*
  Warnings:

  - Made the column `accessToken` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `accessToken` LONGTEXT NOT NULL;

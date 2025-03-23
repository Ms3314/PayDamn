/*
  Warnings:

  - You are about to drop the column `cardnumber` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "cardnumber",
ADD COLUMN     "balance" BIGINT NOT NULL DEFAULT 9000,
ALTER COLUMN "accountNumber" SET DATA TYPE BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "User_accountNumber_key" ON "User"("accountNumber");

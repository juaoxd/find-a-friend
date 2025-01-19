/*
  Warnings:

  - You are about to drop the column `address` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `cep` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "address",
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;

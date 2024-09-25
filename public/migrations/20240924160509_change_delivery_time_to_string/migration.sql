/*
  Warnings:

  - Changed the type of `delivery_time` on the `gigs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "gigs" DROP COLUMN "delivery_time",
ADD COLUMN     "delivery_time" INTEGER NOT NULL;

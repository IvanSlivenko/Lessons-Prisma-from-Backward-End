/*
  Warnings:

  - Made the column `photo` on table `author` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."author" ALTER COLUMN "photo" SET NOT NULL;

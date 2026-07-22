/*
  Warnings:

  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Reservation_giftItemId_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Reservation";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GiftItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "referenceUrl" TEXT,
    "imageUrl" TEXT,
    "price" REAL,
    "status" TEXT NOT NULL DEFAULT 'DISPONIVEL',
    "reservedByName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_GiftItem" ("createdAt", "description", "id", "imageUrl", "name", "price", "status", "updatedAt") SELECT "createdAt", "description", "id", "imageUrl", "name", "price", "status", "updatedAt" FROM "GiftItem";
DROP TABLE "GiftItem";
ALTER TABLE "new_GiftItem" RENAME TO "GiftItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - You are about to drop the column `reservedByName` on the `GiftItem` table. All the data in the column will be lost.

*/
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_GiftItem" ("createdAt", "description", "id", "imageUrl", "name", "price", "referenceUrl", "status", "updatedAt") SELECT "createdAt", "description", "id", "imageUrl", "name", "price", "referenceUrl", "status", "updatedAt" FROM "GiftItem";
DROP TABLE "GiftItem";
ALTER TABLE "new_GiftItem" RENAME TO "GiftItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

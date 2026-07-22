/*
  Warnings:

  - You are about to drop the column `mpPaymentId` on the `MoneyGift` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MoneyGift" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guestName" TEXT NOT NULL,
    "guestContact" TEXT,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "amount" REAL NOT NULL,
    "gatewayTransactionId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_MoneyGift" ("amount", "createdAt", "guestContact", "guestName", "id", "method", "status", "updatedAt") SELECT "amount", "createdAt", "guestContact", "guestName", "id", "method", "status", "updatedAt" FROM "MoneyGift";
DROP TABLE "MoneyGift";
ALTER TABLE "new_MoneyGift" RENAME TO "MoneyGift";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

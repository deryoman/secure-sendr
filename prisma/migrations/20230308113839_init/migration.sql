-- CreateTable
CREATE TABLE "Data" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "iv" TEXT NOT NULL,
    "cipherText" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Paste" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "expiresAt" DATETIME
);

-- CreateIndex
CREATE INDEX "Paste_user_slug_expiresAt_idx" ON "Paste"("user", "slug", "expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "Paste_user_slug_key" ON "Paste"("user", "slug");

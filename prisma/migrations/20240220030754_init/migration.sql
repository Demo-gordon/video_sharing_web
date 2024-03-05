/*
  Warnings:

  - Added the required column `coverImgPath` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoPath` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "videoPath" TEXT NOT NULL,
    "coverImgPath" TEXT NOT NULL,
    CONSTRAINT "Video_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("authorId", "id", "title", "uuid") SELECT "authorId", "id", "title", "uuid" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[videoId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Comment_authorId_key" ON "Comment"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_videoId_key" ON "Comment"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_authorId_key" ON "Video"("authorId");

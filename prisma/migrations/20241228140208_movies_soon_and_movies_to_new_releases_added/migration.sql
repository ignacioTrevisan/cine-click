-- CreateTable
CREATE TABLE "MovieToNewRelease" (
    "movieId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MovieSoon" (
    "movieId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieToNewRelease_movieId_key" ON "MovieToNewRelease"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "MovieSoon_movieId_key" ON "MovieSoon"("movieId");

-- AddForeignKey
ALTER TABLE "MovieToNewRelease" ADD CONSTRAINT "MovieToNewRelease_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieSoon" ADD CONSTRAINT "MovieSoon_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

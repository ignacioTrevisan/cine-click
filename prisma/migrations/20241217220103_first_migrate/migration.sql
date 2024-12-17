-- CreateEnum
CREATE TYPE "Tags" AS ENUM ('Acción', 'Aventura', 'Comedia', 'Drama', 'Terror', 'Ciencia_Ficción', 'Fantasía', 'Suspenso', 'Romance', 'Musical', 'Animada', 'Documental', 'Crimen', 'Bélica', 'Histórica', 'Western', 'Deportes', 'Policial', 'Thriller_Psicológico', 'Superhéroes', 'Noir', 'Biográfica', 'Artes_Marciales', 'Espionaje', 'Zombis', 'Apocalíptica', 'Catástrofes');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "durationMin" INTEGER NOT NULL,
    "tags" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrincipalImage" (
    "id" SERIAL NOT NULL,
    "Url" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "PrincipalImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "Url" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerify" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'user',
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieTheater" (
    "id" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "MovieTheater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieTransmition" (
    "id" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "movieTheaterId" TEXT NOT NULL,

    CONSTRAINT "MovieTransmition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "movieTransmitionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PrincipalImage_movieId_key" ON "PrincipalImage"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "PrincipalImage" ADD CONSTRAINT "PrincipalImage_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieTransmition" ADD CONSTRAINT "MovieTransmition_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieTransmition" ADD CONSTRAINT "MovieTransmition_movieTheaterId_fkey" FOREIGN KEY ("movieTheaterId") REFERENCES "MovieTheater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_movieTransmitionId_fkey" FOREIGN KEY ("movieTransmitionId") REFERENCES "MovieTransmition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

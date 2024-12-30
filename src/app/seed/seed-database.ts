import { Tags } from "@prisma/client";
import prisma from "../../lib/prisma";
import { initalData } from "./seedMovies";

async function main() {

    await prisma.images.deleteMany();
    await prisma.principalImage.deleteMany();
    await prisma.movieSoon.deleteMany();
    await prisma.movieToNewRelease.deleteMany();
    await prisma.movieTransmition.deleteMany();
    await prisma.movie.deleteMany();
    console.log('seed ejecutado correctamente')

    initalData.movies.map(async (m) => {
        const movie = await prisma.movie.create({
            data: {
                title: m.title,
                description: m.description,
                durationMin: m.durationMin,
                tags: m.tags as Tags[],
                isAdult: m.isAdult,
                slug: m.slug
            }
        })
        m.images.map(async (i) => {
            await prisma.images.create({
                data: {
                    Url: i.Url,
                    movieId: movie.id
                }
            })
        })
        await prisma.principalImage.create({
            data: {
                Url: m.principalImage,
                movieId: movie.id
            }
        })
    })
}

(() => {
    main()
})();
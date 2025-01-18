import { Tags } from "@prisma/client";
import prisma from "../../lib/prisma";
import { initalData } from "./seedMovies";





async function firstSeed() {
    await prisma.ticket.deleteMany()
    await prisma.images.deleteMany();
    await prisma.principalImage.deleteMany();
    await prisma.movieSoon.deleteMany();
    await prisma.movieToNewRelease.deleteMany();
    await prisma.movieTransmition.deleteMany();
    await prisma.movie.deleteMany();
    await prisma.movieTheater.deleteMany();

    for (const m of initalData.movies) {
        const movie = await prisma.movie.create({
            data: {
                title: m.title,
                description: m.description,
                durationMin: m.durationMin,
                tags: m.tags as Tags[],
                isAdult: m.isAdult,
                slug: m.slug,
            },
        });

        // Crea las imágenes asociadas a la película
        for (const i of m.images) {
            await prisma.images.create({
                data: {
                    Url: i.Url,
                    movieId: movie.id,
                },
            });
        }

        // Crea la imagen principal
        await prisma.principalImage.create({
            data: {
                Url: m.principalImage,
                movieId: movie.id,
            },
        });
    }
}

async function secondSeed() {
    const teatros = [
        { capacity: 100, name: 'Salón rojo' },
        { capacity: 100, name: 'Salón verde' },
        { capacity: 100, name: 'Salón amarillo' },
    ];

    const movies = await prisma.movie.findMany();

    const movieTransmions = [
        { movieId: movies[0]?.id, date: new Date(), time: '09:00', Price: 20 },
        { movieId: movies[1]?.id, date: new Date(), time: '12:00', Price: 20 },
        { movieId: movies[2]?.id, date: new Date(), time: '15:00', Price: 20 },
        { movieId: movies[3]?.id, date: new Date(), time: '18:00', Price: 20 },
        { movieId: movies[4]?.id, date: new Date(), time: '21:00', Price: 20 },
    ];

    const dates = []
    const today = new Date();
    for (let i = 0; i < 12; i++) {
        dates.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() + i));
    }
    const initSoon = 5
    const initNewRelease = 10
    for (const t of teatros) {
        const theather = await prisma.movieTheater.create({
            data: {
                capacity: t.capacity,
                name: t.name,
            },
        });

        const moviesForTransmition = movies.filter((_, index) => index < initSoon || index > initNewRelease); // Excluye 5-12

        for (const d of dates) {
            for (const mt of movieTransmions) {
                await prisma.movieTransmition.create({
                    data: {
                        movieId: moviesForTransmition[Math.floor(Math.random() * moviesForTransmition.length)].id.toString(),
                        movieTheaterId: theather.id,
                        date: d.toISOString().split('T')[0],
                        time: mt.time,
                        Price: mt.Price,
                    },
                });
            }
        }
    }

    for (let i = initSoon; i < 10; i++) {
        await prisma.movieSoon.create({
            data: {
                movieId: movies[i].id
            }
        });
    }
    for (let a = initNewRelease; a < movies.length; a++) {
        await prisma.movieToNewRelease.create({
            data: {
                movieId: movies[a].id
            }
        })

    }


}



async function main() {
    try {
        await firstSeed();
        await secondSeed();

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
'use server'
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { string, z } from 'zod';


const movieSchema = z.object({
    title: z.string(),
    description: z.string(),
    durationMin: z.number().min(0),
    tags: z.array(string()),
    PrincipalImage: z.string(),
    Images: z.array(string()),
    isAdult: z.boolean()
})

export async function POST(request: Request) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Tu frontend
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    try {
        const { title, description, durationMin, tags, PrincipalImage, Images, isAdult } = await request.json();
        const bodyForVerify = {
            title,
            description,
            durationMin: +durationMin,
            PrincipalImage,
            Images,
            tags,
            isAdult
        }
        console.log({ bodyForVerify })
        const productParsed = movieSchema.safeParse(bodyForVerify);
        if (!productParsed.success) {

            console.log(productParsed.error)
            throw Error('Formato no valido para la duración de la pelicula')
        }
        if (isNaN(+durationMin)) {
            throw Error('Formato no valido para la duración de la pelicula')
        }
        const prismaTx = await prisma.$transaction(async (tx) => {
            const movie = await tx.movie.create({
                data: {
                    title: title,
                    description: description,
                    durationMin: +durationMin,
                    tags: tags,
                    isAdult: isAdult
                }
            });


            const PrincipalImagePrisma = await tx.principalImage.create({
                data: {
                    Url: PrincipalImage,
                    movieId: movie.id
                }
            })
            // Validar y convertir Images a un array de strings si es posible
            const parsedImages: string[] = Array.isArray(Images) && Images.every((img) => typeof img === "string")
                ? Images
                : [];



            const parsedImagesPrisma = parsedImages.map((img) =>
                tx.images.create({
                    data: {
                        Url: img,
                        movieId: movie.id,
                    },
                })
            );
            await Promise.all(parsedImagesPrisma);

            return movie; // Asegúrate de devolver algo de la transacción
        });


        const response = NextResponse.json({ ok: true, movie: prismaTx }, { status: 200 });
        return response;
    } catch (error) {
        console.error('Error en /api/movie:', error);
        throw Error('Ocurrió un error, por favor intente nuevamente más tarde.')

    }
}

export async function GET(request: Request) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Tu frontend
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    try {
        const movies = await prisma.movie.findMany({
            include: {
                PrincipalImage: true,
                Images: true
            }
        });
        const response = NextResponse.json({ ok: true, movies }, { status: 200 });
        return response;
    } catch (error) {
        console.error('Error en /api/movie:', error);
        throw Error('Ocurrió un error, por favor intente nuevamente más tarde.')
    }
}
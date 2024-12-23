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
})

export async function POST(request: Request) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Tu frontend
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    try {
        const { title, description, durationMin, tags, PrincipalImage, Images } = await request.json();
        const bodyForVerify = {
            title,
            description,
            durationMin,
            PrincipalImage,
            Images,
            tags
        }
        const productParsed = movieSchema.safeParse(bodyForVerify);
        if (!productParsed.success) {
            console.log(productParsed.error)
            return {
                ok: false
            }
        }
        const prismaTx = await prisma.$transaction(async (tx) => {
            const movie = await prisma.movie.create({
                data: {
                    title: title,
                    description: description,
                    durationMin: durationMin,
                    tags: tags,
                }
            });

            const PrincipalImagePrisma = await prisma.principalImage.create({
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
                prisma.images.create({
                    data: {
                        Url: img,
                        movieId: movie.id,
                    },
                })
            );
            await Promise.all(parsedImagesPrisma);



        })
        const response = NextResponse.json({ ok: true, prismaTx }, { status: 200 });
        return response
    } catch (error) {
        console.error('Error en /api/movie:', error);

        return NextResponse.json(
            {
                msg: 'Ocurrió un error, por favor intente nuevamente más tarde.',
                ok: false
            },
            { status: 500 }
        );
    }
}

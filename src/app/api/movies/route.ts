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
        console.log(bodyForVerify)
        const productParsed = movieSchema.safeParse(bodyForVerify);
        if (!productParsed.success) {
            console.log('no valido')
            console.log(productParsed.error)
            return NextResponse.json({ ok: false, msg: 'Datos no válidos' }, { status: 400 });
        } else {
            console.log('por el momento valida')
        }
        const prismaTx = await prisma.$transaction(async (tx) => {
            const movie = await tx.movie.create({
                data: {
                    title: title,
                    description: description,
                    durationMin: durationMin,
                    tags: tags,
                }
            });
            console.log('Principal image movie created with ID:', movie.id); // Verifica si el ID está presente

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
            console.log('Parsed Images:', parsedImages); // Verifica el contenido de parsedImages
            console.log('Secondaria image movie created with ID:', movie.id); // Verifica si el ID está presente

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

        console.log('Prisma transaction result:', prismaTx); // Verifica lo que devuelve la transacción

        const response = NextResponse.json({ ok: true, movie: prismaTx }, { status: 200 });
        return response;
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
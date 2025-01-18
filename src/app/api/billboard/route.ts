'use server'

import prisma from "@/lib/prisma";
import { MovieTransmition } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { ApiResponse } from '../../infraestructure/interfaces/api-response';
import { Datum } from "@/app/infraestructure/interfaces/billboard-response";


// const movieTransmitionSchema = z.object({
//     movieId: z.string(),
//     date: z.string(),
//     time: z.string(),
//     Price: z.number().min(0),
//     movieTheaterId: z.string(),
// })
export async function POST(request: Request): Promise<NextResponse<{ ok: boolean, msg: string }>> {
    const response = NextResponse.next();

    // Agregar cabeceras CORS manualmente
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Tu frontend
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    try {
        const {
            movieId,
            date,
            time,
            Price,
            movieTheaterId
        } = await request.json();
        console.log({ date })


        const findMovieTransmition = await prisma.movieTransmition.findFirst({
            where: {
                date: date,
                time: time,
                movieTheaterId: movieTheaterId
            }

        })
        if (findMovieTransmition) {
            return NextResponse.json({ ok: false, msg: 'Ya existe una transmision en ese salón en esa fecha y horario' }, { status: 203 });

        }
        await prisma.movieTransmition.create({
            data: {
                movieId: movieId,
                date: date,
                time: time,
                Price: Price,
                movieTheaterId: movieTheaterId
            }
        })
        const response = NextResponse.json({ ok: true, msg: 'Pelicula cargada correctamente' }, { status: 200 });
        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({ ok: false, msg: 'No se pudo cargar la transmision de la pelicula, por favor vuelva a intentarlo más tarded' }, { status: 203 });

    }

}

export async function GET(request: Request): Promise<NextResponse<ApiResponse<Datum[]>>> {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (id) {
            const movieTransmitions = await prisma.movieTransmition.findMany({
                where: { movieId: id },
                include: {
                    movie: true,
                    movieTheater: true,
                }
            }) as Datum[]
            return NextResponse.json({ ok: true, data: movieTransmitions }, { status: 200 })

        } else {
            const movieTransmitions = await prisma.movieTransmition.findMany({
                include: {
                    movie: true,
                    movieTheater: true,

                },
                orderBy: {
                    date: 'asc',
                }
            }) as Datum[];
            return NextResponse.json({ ok: true, data: movieTransmitions }, { status: 200 })

        }
    } catch (error) {
        // console.log(error)
        return NextResponse.json({ ok: false, msg: `No se pudo obtener las transmisiones de las peliculas, por favor vuelva a intentarlo más tarde ${error}` }, { status: 203 })
    }
}
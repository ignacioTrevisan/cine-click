'use server'

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";



export async function POST(request: Request) {
    const response = NextResponse.next();

    // Agregar cabeceras CORS manualmente
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Tu frontend
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    try {
        const {
            capacity, name
        } = await request.json();



        const movieTheather = await prisma.movieTheater.create({
            data: {
                capacity: capacity,
                name: name
            }
        })
        const response = NextResponse.json({ ok: true, movieTheather }, { status: 200 });
        return response;
    } catch (error) {
        console.log(error)
        throw Error('No se ha podido cargar la transmision de pelicula a la base de datos, por favor vuelva a intentarlo más tarde')
    }

}

export async function GET(request: Request) {
    const response = NextResponse.next();

    // Agregar cabeceras CORS manualmente
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Tu frontend
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    try {
        const movieTheather = await prisma.movieTheater.findMany({})
        const response = NextResponse.json({ ok: true, data: movieTheather }, { status: 200 });
        return response;
    } catch (error) {
        console.log(error)
        throw Error('No se ha podido cargar la transmision de pelicula a la base de datos, por favor vuelva a intentarlo más tarde')
    }

}
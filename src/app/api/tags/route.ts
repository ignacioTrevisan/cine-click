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

export async function GET(request: Request) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Tu frontend
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    try {

        const tags = [
            "Acción",
            "Aventura",
            "Comedia",
            "Drama",
            "Terror",
            "Ciencia_Ficción",
            "Fantasía",
            "Suspenso",
            "Romance",
            "Musical",
            "Animada",
            "Documental",
            "Crimen",
            "Bélica",
            "Histórica",
            "Western",
            "Deportes",
            "Policial",
            "Thriller_Psicológico",
            "Superhéroes",
            "Noir",
            "Biográfica",
            "Artes_Marciales",
            "Espionaje",
            "Zombis",
            "Apocalíptica",
            "Catástrofes"
        ];

        const response = NextResponse.json({ ok: true, tags: tags }, { status: 200 });
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
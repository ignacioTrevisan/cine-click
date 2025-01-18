import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Tu frontend
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    try {

        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (id) {
            const movies = await prisma.movie.findUnique({
                where: { id },
                include: {
                    Images: { select: { Url: true } },
                    PrincipalImage: { select: { Url: true } }
                }
            });
            const { id: iddos, Images: images, PrincipalImage: image, ...rest } = movies
            return NextResponse.json({ ...rest, images, principalImage: image[0].Url }, { status: 200 });
        }
    } catch (error) {
        console.error('Error en /api/movie:', error);
        return NextResponse.json({ ok: false, message: 'Ocurrió un error, por favor intente nuevamente más tarde.' }, { status: 500 });
    }
}

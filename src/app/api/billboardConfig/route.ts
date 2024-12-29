import { ApiResponse } from "@/app/infraestructure/interfaces/api-response";
import { BillboardConfigResponse } from "@/app/infraestructure/interfaces/billboardConfig-response";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(): Promise<ApiResponse<BillboardConfigResponse>> {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Tu frontend
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    try {
        const soon = await prisma.movieSoon.findMany();
        const newRelease = await prisma.movieToNewRelease.findMany();
        const resp = { soon, newRelease }
        const response = NextResponse.json({ ok: true, data: resp }, { status: 200 });
        return response;
    } catch (error) {
        return {
            ok: false
        }
    }
}

export async function POST(request: Request): Promise<ApiResponse> {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Tu frontend
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    try {
        const {
            mode,
            idMovie
        } = await request.json();
        let msg = '';

        if (mode === 'soon') {
            const exist = await prisma.movieSoon.findFirst({ where: { movieId: idMovie } })
            if (!exist) {
                msg = 'agregada a'
                await prisma.movieSoon.create({
                    data: {
                        movieId: idMovie
                    }
                })
            } else {
                msg = 'eliminada de'
                await prisma.movieSoon.delete({
                    where: {
                        movieId: idMovie
                    }
                })
            }
        } else {
            const exist = await prisma.movieToNewRelease.findFirst({ where: { movieId: idMovie } })
            if (!exist) {
                msg = 'agregada a'
                await prisma.movieToNewRelease.create({
                    data: {
                        movieId: idMovie
                    }
                })
            } else {
                msg = 'eliminada de'
                await prisma.movieToNewRelease.delete({
                    where: {
                        movieId: idMovie
                    }
                })
            }
        }
        const response = NextResponse.json({ ok: true, msg: `Pelicula ${msg} '${mode}' correctamente` }, { status: 200 });
        return response;


    } catch (error) {
        console.log(error)
        return {
            ok: false
        }
    }
}
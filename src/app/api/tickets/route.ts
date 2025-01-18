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
        if (!id) {
            return NextResponse.json({
                ok: false,
                msg: 'Falta el id'
            }, { status: 500 })
        }
        const resp = await prisma.ticket.findMany({
            where: { userId: id },
            include: { movieTransmition: { include: { movie: true, movieTheater: true } } }
        });

        return NextResponse.json({
            ok: true,
            data: resp
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            ok: false,
            msg: 'Error en la peticion'
        }, { status: 500 })
    }
}

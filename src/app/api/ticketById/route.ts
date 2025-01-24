import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        console.log('el id acá es ', id)
        if (!id) {
            return NextResponse.json({
                ok: false,
                msg: 'Falta el id'
            }, { status: 500 })
        }
        const resp = await prisma.ticket.findUnique({
            where: { id: id },
            include: { movieTransmition: { include: { movie: true, movieTheater: true } } }
        });
        console.log(resp)
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

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    try {
        const transmitionID = new URL(request.url);
        const id = transmitionID.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ ok: false, msg: 'Falta el id de la transmision' }, { status: 404 });
        }
        const findTransmition = await prisma.movieTransmition.findFirst({ where: { id: id } });
        if (!findTransmition) {
            return NextResponse.json({
                ok: false,
                msg: `No se encontro ninguna pelicula con ese id.`,
            }, { status: 404 });
        }
        const transmissions = await prisma.movieTransmition.findMany({
            where: {
                date: findTransmition.date,
                time: findTransmition.time,
                movieId: findTransmition.movieId,
            },
            include: {
                movieTheater: true,
                movie: true
            }
        });

        return NextResponse.json({
            ok: true,
            msg: `Se encontro la cantidad de ${transmissions.length} transmisiones con esa fecha, horario y pelicula`,
            data: transmissions
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ ok: false, msg: `Ocurrio un error inesperado, por favor vuelva a intentarlo más tarde.` }, { status: 500 });
    }


}
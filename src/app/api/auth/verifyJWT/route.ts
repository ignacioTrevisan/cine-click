'use server'
import { ApiResponse } from '@/app/infraestructure/interfaces/api-response';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: Request): Promise<ApiResponse> {
    const response = NextResponse.next();

    // Agregar cabeceras CORS manualmente
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Tu frontend
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    try {
        const authHeader = request.headers.get('authorization');

        if (!authHeader) {
            console.log('No se encontraron cookies en la solicitud');
            return NextResponse.json({ ok: false, msg: 'No se encontraron cookies en la solicitud' }, { status: 401 });
        }
        const token = authHeader.split(' ')[1];
        console.log({ token })
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        const newToken = jwt.sign(
            {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
                name: decoded.name,
            },
            process.env.JWT_SECRET!,
            { expiresIn: '6h' }
        );

        response.cookies.set('token', newToken, {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        console.log({ response })
        return NextResponse.json({ ok: true, msg: 'Token autorizado y actualizado correctamente' }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ ok: false, msg: `Token no válido: ${error}` }, { status: 401 });

    }
}
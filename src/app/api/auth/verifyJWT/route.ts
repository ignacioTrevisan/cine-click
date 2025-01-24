'use server'
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    id: string;
    email: string;
    role: string;
    name: string;
    iat?: number; // Opcional: incluye la marca de tiempo de emisión.
    exp?: number; // Opcional: incluye la marca de tiempo de expiración.
}

export async function GET(request: Request): Promise<Response> {
    const response = NextResponse.next();

    // Configuración de cabeceras CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    try {
        const authHeader = request.headers.get('authorization');

        if (!authHeader) {
            console.log('No se encontró el encabezado Authorization');
            return NextResponse.json({ ok: false, msg: 'No se encontró el token en la solicitud' }, { status: 401 });
        }

        let token = authHeader.split(' ')[1];

        if (!token) {
            token = authHeader.split(' ')[0];
            console.log('Token after second split:', token);
            if (!token) {
                return NextResponse.json({ ok: false, msg: 'Token no proporcionado' }, { status: 401 });
            }
        }

        if (!process.env.JWT_SECRET) {
            return NextResponse.json({ ok: false, msg: 'Falta la clave JWT_SECRET en el entorno' }, { status: 500 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;


        const newToken = jwt.sign(
            {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
                name: decoded.name,
            },
            process.env.JWT_SECRET,
            { expiresIn: '6h' }
        );

        response.cookies.set('token', newToken, {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        response.cookies.set('user_id', decoded.id, {
            httpOnly: false,
            maxAge: 6 * 60 * 60,
            path: '/',
            secure: false,
        });

        return NextResponse.json({ ok: true, msg: 'Token autorizado y actualizado correctamente', data: decoded }, { status: 200 });

    } catch (error) {
        console.error('Error al procesar el token:', error);
        return NextResponse.json({ ok: false, msg: `Token no válido: ${error}` }, { status: 401 });
    }
}

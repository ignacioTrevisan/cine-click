'use server'
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    const response = NextResponse.next();

    // Agregar cabeceras CORS manualmente
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Tu frontend
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    try {


        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                {
                    msg: 'El email y la contraseña son obligatorios.',
                    ok: false
                },
                { status: 400 }
            );
        }

        // Buscar el usuario en la base de datos
        const user = await prisma.user.findUnique({ where: { email: email } });

        if (!user) {
            return NextResponse.json(
                {
                    msg: 'No se encontró un usuario con estas credenciales.',
                    ok: false
                },
                { status: 400 }
            );
        }

        // Validar la contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                {
                    msg: 'Credenciales inválidas.',
                    ok: false
                },
                { status: 400 }
            );
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, name: user.name },
            process.env.JWT_SECRET!, // Clave secreta desde el archivo .env
            { expiresIn: "6h" }
        );

        // Excluir la contraseña antes de enviar los datos del usuario
        const { password: omit, ...rest } = user;

        // Crear la respuesta y establecer la cookie
        const responseBody = {
            ok: true,
            user: rest,
        };
        const response = NextResponse.json(responseBody, { status: 200 });

        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: '/',
            secure: true,
            sameSite: 'lax',
        });
        return response
    } catch (error) {
        console.error('Error en /api/auth/login:', error);

        return NextResponse.json(
            {
                msg: 'Ocurrió un error, por favor intente nuevamente más tarde.',
                ok: false
            },
            { status: 500 }
        );
    }
}

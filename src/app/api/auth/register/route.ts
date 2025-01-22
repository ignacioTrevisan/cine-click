'use server'
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { email, name, dni, password } = await request.json();
        const CryptedPassword = bcrypt.hashSync(password, 10);

        // Verificar si el usuario ya existe
        let findUser = await prisma.user.findUnique({ where: { email } });
        if (findUser) {
            return NextResponse.json({
                msg: 'Ya existe un usuario con estas credenciales.',
                ok: false
            }, { status: 400 });
        }

        findUser = await prisma.user.findUnique({ where: { dni } });
        if (findUser) {
            return NextResponse.json({
                msg: 'Ya existe un usuario con estas credenciales.',
                ok: false
            }, { status: 400 });
        }

        // Crear nuevo usuario
        await prisma.user.create({
            data: { email, name, dni, password: CryptedPassword }
        });

        // Generar token JWT


        // Configurar respuesta con cookies
        const response = NextResponse.json({
            ok: true,
            msg: 'Usuario creado correctamente.',
        });



        return response;
    } catch (error) {
        console.error("Error en registro:", error);
        return NextResponse.json({
            msg: 'Ocurrió un error, por favor intente más tarde.',
            ok: false,
        }, { status: 500 });
    }
}

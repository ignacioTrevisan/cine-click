import { ApiResponse } from '@/app/infraestructure/interfaces/api-response';
import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from "bcryptjs";
import { Role } from '@prisma/client';




export async function POST(request: Request): Promise<ApiResponse> {
    try {
        const { email, name, role, image, password } = await request.json();
        const CryptedPassword = bcrypt.hashSync(password, 10);


        const findUser = await prisma.user.findUnique({ where: { email } })
        if (findUser) {
            return NextResponse.json({
                msg: 'Ya existe un usuario con estas credenciales, por favor ingrese una nueva',
                ok: false
            }, {
                status: 400
            })
        }
        const UserBody = {
            email,
            name,
            image,
            password: CryptedPassword
        };

        await prisma.user.create({ data: UserBody });
        //TODO: Al registrarse deberia logearse automaticamente.
        return NextResponse.json({
            ok: true,
            msg: 'Usuario creado correctamente.'
        }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            msg: 'Ocurrió un error, por favor vuelva a intentarlo más tarde',
            ok: false
        }, {
            status: 500
        })
    }
}
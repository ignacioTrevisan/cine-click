'use server'

import { ApiResponse } from "@/app/infraestructure/interfaces/api-response";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { User } from "../../entities/userEntities";

export const GetUserInfo = async (): Promise<ApiResponse<User>> => {
    try {
        const cookieStore = await cookies(); // Devuelve todas las cookies
        const userId = cookieStore.get("user_id")?.value;
        if (!userId) {
            return {
                ok: false,
                msg: 'No se ha podido encontrar la cookie con el id del usuario'
            }
        }
        const user = await prisma.user.findUnique({ where: { id: userId } }) as User;
        if (!user) {
            return {
                ok: false,
                msg: `No se ha podido encontrar al usuario con id ${userId}`
            }
        }
        return {
            ok: true,
            data: user
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: 'Ha ocurrido un error en el proceso de busqueda del usuario, por favor contacte con el administrador'
        }
    }
}

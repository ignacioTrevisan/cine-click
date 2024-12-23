'use server'
import { ApiResponse } from "@/app/infraestructure/interfaces/api-response";
import { cookies } from "next/headers";

export const DeleteJWT = async (): Promise<ApiResponse> => {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('token');
        return { ok: true };
    } catch (error) {
        console.error('Error al verificar el JWT:', error);
        return { ok: false, msg: 'Error al verificar el JWT' };
    }
};

'use server'
import { ApiResponse } from "@/app/infraestructure/interfaces/api-response";
import { cookies } from "next/headers";

export const verifyJWT = async (): Promise<ApiResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');
        if (!token) {
            return { ok: false, msg: 'No se encontraron cookies en la solicitud' };
        }
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verifyJWT`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.value}`,
            },
            credentials: 'include', // Incluir cookies en la petición
        });

        if (!resp.ok) {
            return { ok: false, msg: 'Token inválido o expirado' };
        }

        const data = await resp.json();
        return { ok: true, data };
    } catch (error) {
        console.error('Error al verificar el JWT:', error);
        return { ok: false, msg: 'Error al verificar el JWT' };
    }
};

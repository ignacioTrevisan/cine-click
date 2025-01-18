'use server'

import { ApiResponse } from "@/app/infraestructure/interfaces/api-response";

interface Props {
    name: string,
    email: string,
    password: string,
    dni: string
}
export const Register = async ({ name, email, password, dni }: Props): Promise<ApiResponse> => {
    try {

        const bodyForFetch = {
            name, email, password, dni
        };

        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
            method: 'POST', // Asegúrate de especificar el método
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyForFetch), // Convierte el objeto a JSON
            credentials: 'include'
        });

        const data = await resp.json() as { ok: boolean, msg: string }
        return data;
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            msg: 'Ocurrio un error creando la cuenta, por favor vuelva a intentarlo más tarde.'
        }
    }
}

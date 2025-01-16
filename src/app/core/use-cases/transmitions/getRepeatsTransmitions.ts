'use server'

import { ApiResponse } from "@/app/infraestructure/interfaces/api-response";
import { Datum } from "@/app/infraestructure/interfaces/billboard-response";

export const GetRepeatsTransmitions = async (id: string): Promise<ApiResponse<Datum[]>> => {
    try {

        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transmitions?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const respD = await resp.json() as ApiResponse<Datum[]>;
        if (!respD.ok) {
            throw Error('Error en la petición')
        }
        return {
            ok: true,
            data: respD.data
        }
    } catch (error) {
        return {
            ok: false
        }
    }
}

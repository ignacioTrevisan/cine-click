'use server'

import { ApiResponse } from "@/app/infraestructure/interfaces/api-response"
import { Datum } from "@/app/infraestructure/interfaces/billboard-response"
import { MovieTheater } from "@prisma/client"

export const GetAllTransmition = async (): Promise<ApiResponse<Datum[]>> => {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/billboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        // Promise<NextResponse<{ ok: boolean, msg: string }>>
        const data = await resp.json() as ApiResponse<Datum[]>;

        console.log(data);

        return {
            ok: true,
            data: data.data
        }
    } catch (error) {
        return {
            ok: false
        }
    }
}

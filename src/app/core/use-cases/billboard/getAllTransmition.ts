'use server'

import { ApiResponse } from "@/app/infraestructure/interfaces/api-response"
import { Datum } from "@/app/infraestructure/interfaces/billboard-response"

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


        return {
            ok: true,
            data: data.data
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false
        }
    }
}

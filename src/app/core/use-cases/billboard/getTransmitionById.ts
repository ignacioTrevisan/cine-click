import { Datum } from '@/app/infraestructure/interfaces/billboard-response';
import React from 'react'
import { ApiResponse } from '../../../infraestructure/interfaces/api-response';

export const GetTransmitionById = async (id: string) => {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/billboard?id=${id}`, {
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
        return {
            ok: false
        }
    }
}

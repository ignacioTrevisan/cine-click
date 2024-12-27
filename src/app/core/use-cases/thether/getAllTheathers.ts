'use server'

import { ApiResponse } from "@/app/infraestructure/interfaces/api-response"

export const GetAllTheathers = async (): Promise<ApiResponse> => {

    try {

        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/theather`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const respD = await resp.json() as { ok: boolean, data: { id: string, capacity: number, name: string }[] };
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

'use server'

import { ApiResponse } from "@/app/infraestructure/interfaces/api-response"
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

interface bodyFormPost {
    movieId: string;
    date: string;
    time: string;
    Price: Number;
    movieTheaterId: string;
}

export const NewTransmition = async (bodyFormPost: bodyFormPost): Promise<ApiResponse> => {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/billboard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...bodyFormPost }),

        })

        const data = await resp.json() as { ok: boolean, msg: string };
        revalidatePath('/admin/billboard')

        return {
            ok: data.ok,
            msg: data.msg
        }
    } catch (error) {
        console.log(error)
        throw Error('Error al intentar subir la transmision')
    }
}

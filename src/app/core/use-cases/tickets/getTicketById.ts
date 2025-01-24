"use server"

import { TicketByIdData, TicketsByIDResponse } from "@/app/infraestructure/interfaces/ticketsReponse";
import { cookies } from "next/headers";
import { ApiResponse } from '../../../infraestructure/interfaces/api-response';

export const GetTicketsById = async (id: string): Promise<ApiResponse<TicketByIdData>> => {
    const cookieStore = await cookies();
    const user_id = cookieStore.get('user_id');
    if (!user_id) {
        throw new Error('No tienes permisos para ver este ticket')
    }
    try {

        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ticketById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        });
        const { data } = await resp.json() as TicketsByIDResponse;
        if (data.userId !== user_id.value) {
            console.log(`No tienes permisos para ver este ticket ${data.userId} !== ${user_id.value}`)
            return { ok: false, msg: `No tienes permisos para ver este ticket ${data.userId} !== ${user_id.value}` }
        }
        return {
            ok: true,
            data: data
        };
    } catch (error) {
        console.log(error)
        throw new Error('Ocurrio un error al intentar obtener los tickets por id, por favor vuelva a intentarlo más tarde')
    }
}
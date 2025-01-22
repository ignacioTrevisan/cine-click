"use server"

import { TicketsBYIDAPIResponse } from "@/app/infraestructure/interfaces/ticketsReponse";

export const GetTicketsByUser = async (userId: string): Promise<TicketsBYIDAPIResponse> => {
    try {

        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets?id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        });
        const data = await resp.json() as TicketsBYIDAPIResponse;
        return data;
    } catch (error) {
        console.log(error)
        throw new Error('Ocurrio un error al intentar obtener los tickets por usuario, por favor vuelva a intentarlo más tarde')
    }
}
"use server"

import { TicketsBYUSERAPIResponse } from "@/app/infraestructure/interfaces/ticketsReponse";

export const GetTicketsByUser = async (userId: string): Promise<TicketsBYUSERAPIResponse> => {
    try {

        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets?id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        });
        const data = await resp.json() as TicketsBYUSERAPIResponse;
        return data;
    } catch (error) {
        console.log(error)
        throw new Error('Ocurrio un error al intentar obtener los tickets por usuario, por favor vuelva a intentarlo más tarde')
    }
}
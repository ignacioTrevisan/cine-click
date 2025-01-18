'use server'
import { PaypalCheckoutResponse } from "@/app/infraestructure/interfaces/paypal.responses";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


interface Props {
    transactionId: string,
    movieTransmitionId: string
    quantity: number

    createdAt: string
    totalPrice: number
}
export const PayWithPaypal = async ({ transactionId, movieTransmitionId, quantity, createdAt, totalPrice }: Props): Promise<{ ok: boolean, respuesta?: PaypalCheckoutResponse }> => {
    try {
        console.log({ transactionId })
        const accessToken = await getAccessToken();
        const response = await fetch(`https://api.sandbox.paypal.com/v2/checkout/orders/${transactionId}/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const cookieStore = await cookies(); // Devuelve todas las cookies
        const userId = cookieStore.get("user_id")?.value;
        if (!userId) {
            return {
                ok: false
            }
        }
        console.log('Hay user id', userId)
        const respuesta: PaypalCheckoutResponse = await response.json();
        console.log({ respuesta })
        if (respuesta.status === 'COMPLETED') {
            const list = await prisma.movieTransmition.findUnique({ where: { id: movieTransmitionId } })
            if (!list) {
                return {
                    ok: false
                }
            }
            const ticket = await prisma.ticket.create({
                data: {
                    movieTransmitionId: movieTransmitionId,
                    quantity: quantity,
                    userId: userId,
                    createdAt: createdAt,
                    paidAt: new Date().toISOString().split('T')[0],
                    totalPrice: totalPrice
                }
            })

            await prisma.movieTransmition.update({
                where: { id: movieTransmitionId },
                data: { TicketSold: (list.TicketSold + quantity) }
            })
            revalidatePath(`orders/${ticket.id}`)
        } else {
            return {
                ok: false
            }
        }
        return { ok: true, respuesta }

    } catch (error) {
        console.log(error)
        return {
            ok: false
        }
    }

}

const getAccessToken = async () => {
    try {


        const response = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
            method: "POST",
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.NEXT_PUBLIC_PAYPAL_SECRET_ID}`
                ).toString("base64")}`,
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control": "no-cache", // Asegura que no use caché
            },
            body: "grant_type=client_credentials",
            cache: "no-store", // Configuración adicional para evitar caché
        });

        const data = await response.json();



        return data.access_token;
    }
    catch (error) {
        console.log(error)
    }
};

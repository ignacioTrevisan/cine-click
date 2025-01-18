'use server';
import prisma from '@/lib/prisma';
interface Props {
    amount: string,
}

interface Reponse {
    id: string,
    status: string
}
export const CreateOrder = async ({ amount }: Props): Promise<{ resp?: Reponse, ok: boolean }> => {
    try {
        console.log({ amount })
        const accessToken = await getAccessToken();
        const formattedQuantity = Number(amount).toFixed(2);
        const order = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`, // Token de acceso obtenido
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {

                        amount: {
                            currency_code: "USD",
                            value: `${formattedQuantity}`, // Aquí iría el total del carrito
                        },
                    },
                ],
            }),
        });
        const orderPasted: Reponse = await order.json();



        return {
            ok: true,
            resp: orderPasted
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false
        }
    }
}

const getAccessToken = async () => {
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

    if (!data.access_token) {
        throw new Error("Error obteniendo el token de acceso");
    }
    return data.access_token; // Este es tu ACCESS_TOKEN
};
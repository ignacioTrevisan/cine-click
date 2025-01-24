"use client"
import { PayWithPaypal } from '@/app/core/use-cases/orders/payWithPaypal'
import { CreateOrder } from '@/app/helpers/checkoutPaypal'
import { useUserStore } from '@/app/store/user'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { redirect } from 'next/navigation'

interface Props {
    totalToPay: string,
    movieTransmitionId: string
    quantity: number
    userId: string,
    createdAt: string

}
export const PayPalButton = ({
    totalToPay,
    movieTransmitionId,
    quantity,
    createdAt,
}: Props) => {


    const [{ isPending }] = usePayPalScriptReducer();
    const userId = useUserStore((state) => state.userId); // Accede a la función para actualizar el id

    if (isPending || quantity === 0 || !userId) {
        return (
            <div className="animate-pulse mb-16">
                <div className="h-11 bg-gray-300 rounded"></div>
                <div className="h-11 bg-gray-300 rounded mt-2"></div>
            </div>
        );
    }

    return (
        <>
            <PayPalButtons
                key={totalToPay} // Fuerza la recreación del componente cuando cambia totalToPay
                createOrder={async () => {

                    const resp = await CreateOrder({ amount: totalToPay });
                    if (!resp.ok) {
                        throw Error("No se pudo crear la orden");
                    }
                    return resp.resp!.id;
                }}
                onApprove={async (data) => {


                    const resp = await PayWithPaypal({
                        transactionId: data.orderID,
                        movieTransmitionId,
                        quantity,
                        createdAt,
                        totalPrice: +totalToPay,
                        userId: userId
                    });
                    console.log('resp', resp)
                    if (resp.ok) {
                        redirect(`ticketSold/${resp.idTicket}`);
                    }
                }}
                onError={(err) => {
                    console.error("Error en el flujo de PayPal:", err);
                }}
            />
        </>
    );
};
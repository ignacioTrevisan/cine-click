'use client'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'


interface Props {
    children: React.ReactNode
}
export const PaypalProvider = ({ children }: Props) => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';
    console.log(clientId)
    return (
        <PayPalScriptProvider options={{
            clientId: clientId,
            intent: 'capture',
            currency: 'USD'
        }}>
            {children}
        </PayPalScriptProvider>

    )
}

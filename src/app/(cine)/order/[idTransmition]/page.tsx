import type { Metadata } from 'next'
import { TicketTables } from './ui/ticketTables'
import { GetRepeatsTransmitions } from '../../../core/use-cases/transmitions/getRepeatsTransmitions';
import { Footer } from '@/app/components/footer';

interface Props {
    params: Promise<{
        idTransmition: string
    }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // read route params
    const idTransmition = (await params).idTransmition

    return {
        title: idTransmition,
        description: `${idTransmition} description`,
        openGraph: {
            title: idTransmition,
            description: idTransmition ?? '',

        },
    }
}



export default async function OrderPage({ params }: Props) {
    const idTransmition = (await params).idTransmition
    const transmitions = await GetRepeatsTransmitions(idTransmition);
    if (!transmitions.data) return;
    return (
        <>
            <div className="w-full absolute flex justify-center sm:mt-[80px]">
                <h1 className="text-2xl font-bold">Generar Orden de Compra</h1>
            </div>
            <TicketTables transmisions={transmitions.data} />
            <Footer />
        </>
    )
}
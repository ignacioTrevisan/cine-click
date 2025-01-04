import type { Metadata, ResolvingMetadata } from 'next'
import { TicketTables } from './ui/ticketTables'

interface Props {
    params: Promise<{
        idTransmition: string
    }>
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
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
    console.log({ idTransmition })

    return (
        <TicketTables />
    )
}
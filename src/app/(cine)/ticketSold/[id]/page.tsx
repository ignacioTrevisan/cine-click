import { GetTicketsById } from '@/app/core/use-cases/tickets/getTicketById';
import { Cart } from './ui/cart';


interface Props {
    params: Promise<{
        id: string
    }>
}



export default async function template({ params }: Props) {
    const id = (await params).id;
    const ticketInfo = await GetTicketsById(id);
    if (ticketInfo.ok === false) {
        return (<p>{ticketInfo.msg}</p>)
    }
    if (!ticketInfo.data) return;
    console.log(ticketInfo)
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Cart
                date={ticketInfo.data.movieTransmition.date}
                movie={ticketInfo.data.movieTransmition.movie.title}
                slug={ticketInfo.data.movieTransmition.movie.slug}
                time={ticketInfo.data.movieTransmition.time}
                quantity={ticketInfo.data.quantity}
                key={ticketInfo.data.id}
            />
        </div>
    );
};
import { GetTicketsByUser } from '@/app/core/use-cases/tickets/getTicketsByUser'
import TicketsTable from './components/TicketsTable'


export default async function Home() {
    const tickets = await GetTicketsByUser();
    return (
        <div className="container mx-auto  py-10 px-4">
            <h1 className="text-3xl font-bold mb-5 text-center mt-10 text-gray-800">Tus tickets</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <TicketsTable tickets={tickets.data} />
            </div>
        </div>
    )
}

"use client"
import React, { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Datum } from '@/app/infraestructure/interfaces/ticketsReponse'
import { useUserStore } from '@/app/store/user'
import { GetTicketsByUser } from '@/app/core/use-cases/tickets/getTicketsByUser'




const TicketsTable: React.FC = () => {
    const userId = useUserStore((state) => state.userId);
    const [tickets, setTickets] = useState<Datum[]>([])
    useEffect(() => {
        if (!userId) return;
        const getTickets = async () => {
            const resp = await GetTicketsByUser(userId);
            setTickets(resp.data)
        }
        getTickets()
    }, [userId])

    const [selectedTicket, setSelectedTicket] = useState<string | null>(null)

    const handleGenerateQR = (ticketId: string) => {
        setSelectedTicket(ticketId === selectedTicket ? null : ticketId)
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Ticket ID</th>
                        <th className="py-3 px-4 text-left">Película</th>
                        <th className="py-3 px-4 text-left">Personas</th>
                        <th className="py-3 px-4 text-left">Salón</th>
                        <th className="py-3 px-4 text-left">Fecha</th>
                        <th className="py-3 px-4 text-left">Hora</th>
                        <th className="py-3 px-4 text-left">Total Pagado</th>
                        <th className="py-3 px-4 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {tickets.map((t) => (
                        <React.Fragment key={t.id}>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{t.id}</td>
                                <td className="py-3 px-4">{t.movieTransmition.movie.title}</td>
                                <td className="py-3 px-4">{t.quantity}</td>
                                <td className="py-3 px-4">{t.movieTransmition.movieTheater.name}</td>
                                <td className="py-3 px-4">{t.movieTransmition.date.toString()}</td>
                                <td className="py-3 px-4">{t.movieTransmition.time}</td>
                                <td className="py-3 px-4">${(+t.totalPrice).toFixed(2)}</td>
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => handleGenerateQR(t.id)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Generar QR
                                    </button>
                                </td>
                            </tr>
                            {selectedTicket === t.id && (
                                <tr>
                                    <td colSpan={8} className="py-4">
                                        <div className="flex justify-center">
                                            <QRCodeSVG value={JSON.stringify(t.movieTransmitionId)} size={200} />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TicketsTable


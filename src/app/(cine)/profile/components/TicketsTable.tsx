"use client"
import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Datum } from '@/app/infraestructure/interfaces/ticketsReponse'

type Ticket = {
    ticket_id: string
    pelicula: string
    cantidad_personas: number
    salon: string
    fecha: string
    hora: string
    total_pagado: number
}

const tickets: Ticket[] = [
    {
        ticket_id: "T001",
        pelicula: "Inception",
        cantidad_personas: 2,
        salon: "Sala 1",
        fecha: "2023-06-15",
        hora: "19:30",
        total_pagado: 25.00
    },
    {
        ticket_id: "T002",
        pelicula: "The Avengers",
        cantidad_personas: 4,
        salon: "Sala 3",
        fecha: "2023-06-16",
        hora: "20:00",
        total_pagado: 48.00
    },
    {
        ticket_id: "T003",
        pelicula: "Jurassic Park",
        cantidad_personas: 3,
        salon: "Sala 2",
        fecha: "2023-06-17",
        hora: "18:45",
        total_pagado: 36.00
    },
]

interface Props {
    tickets: Datum[]
}

const TicketsTable: React.FC<Props> = ({ tickets }: Props) => {
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


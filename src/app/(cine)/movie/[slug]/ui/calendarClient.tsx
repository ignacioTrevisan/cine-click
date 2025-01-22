'use client'

import { Datum } from "@/app/infraestructure/interfaces/billboard-response"
import { useState } from "react"
import dynamic from 'next/dynamic';

const CalendarElement = dynamic(() => import('./calendar').then(mod => mod.CalendarElement), { ssr: false });

interface Props {
    movieTransmitionFormatted?: { start: Date, end: Date, title: string, id: string }[]
    movieTransmitions?: Datum[]
}
export const CalendarClient = ({ movieTransmitionFormatted, movieTransmitions }: Props) => {
    const [showCalendar, setShowCalendar] = useState(false)
    return (
        <>
            <button onClick={() => setShowCalendar(true)}>Ver fechas disponibles</button>
            {showCalendar && <CalendarElement movieTransmitions={movieTransmitions} movieTransmitionFormatted={movieTransmitionFormatted} />}
        </>
    )
}

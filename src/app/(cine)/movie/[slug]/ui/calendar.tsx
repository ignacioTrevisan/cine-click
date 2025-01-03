'use client'

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Datum } from '@/app/infraestructure/interfaces/billboard-response';

const localizer = momentLocalizer(moment)

interface Props {
    movieTransmitionFormatted?: { start: Date, end: Date, title: string, id: string }[]
    movieTransmitions?: Datum[]
}
export const CalendarElement = ({ movieTransmitionFormatted, movieTransmitions }: Props) => {
    console.log({ movieTransmitionFormatted })
    const selectEvent = (id: string) => {
        const findTransmitions = movieTransmitions?.filter((t) => t.id === id);
        const findStepTwo = movieTransmitions?.filter((t) => t.date === findTransmitions![0].date && t.time === findTransmitions![0].time);

    }
    return (
        <div>
            {
                movieTransmitionFormatted && movieTransmitionFormatted.length > 0 ?

                    <Calendar
                        localizer={localizer}
                        events={movieTransmitionFormatted}
                        onSelectEvent={(event: {
                            start: Date; end: Date; title: string; id: string;
                        }) => selectEvent(event.id)}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        defaultView={'agenda'}
                    />
                    : <h3>No hay funciones disponibles</h3>
            }
        </div>
    )
}

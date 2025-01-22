'use client'


import { Datum } from '@/app/infraestructure/interfaces/billboard-response';
import { useRouter } from 'next/navigation';
import { Translanter, TranslateMonth } from '../../../../helpers/translanteText';
import { useState } from 'react';
import { BiArrowFromLeft, BiArrowFromRight, BiCalendar, BiTimeFive } from 'react-icons/bi';


interface Props {
    movieTransmitionFormatted?: { start: Date, end: Date, title: string, id: string }[]
    movieTransmitions?: Datum[]
}
export const CalendarElement = ({ movieTransmitionFormatted, movieTransmitions }: Props) => {
    const router = useRouter();
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [monthForView, setMonthForView] = useState(new Date().getMonth())
    const selectEvent = (id: string) => {
        const findTransmitions = movieTransmitions?.filter((t) => t.id === id);
        const findStepTwo = movieTransmitions?.filter((t) => t.date === findTransmitions![0].date && t.time === findTransmitions![0].time);
        if (findStepTwo && findStepTwo.length > 0) {
            router.push(`/order/${findStepTwo![0].id}`)
        }
    }
    const transmitionInScreen = movieTransmitionFormatted?.filter((t) => t.start.toString().split(' ')[1] === monthArr[monthForView]);
    return (
        <>  <div className='flex flex-row items-center text-xl gap-2 '>
            {/* <button className='btn btn-primary'>Anterior</button> */}
            <div className='cursor-pointer hover:text-teal-600'>

                <BiArrowFromRight onClick={() => {
                    if (monthForView === 0) {
                        setMonthForView(11)
                        return;
                    } setMonthForView(monthForView - 1)
                }} />
            </div>
            <h3>{TranslateMonth(monthArr[monthForView])}</h3>
            <div className='cursor-pointer hover:text-teal-600' onClick={() => setMonthForView(monthForView + 1)}>

                <BiArrowFromLeft />
            </div>
            {/* <button className='btn btn-primary'>Siguiente</button> */}
        </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {

                    transmitionInScreen && transmitionInScreen.length > 0 ?
                        transmitionInScreen.map((t) => (
                            <div key={t.id} className='border rounded-md p-5  hover:bg-slate-200 cursor-pointer bg-white' onClick={() => selectEvent(t.id)}>
                                <div className="flex items-center font-bold gap-1">
                                    <BiCalendar /><p>{Translanter(t.start.toString().split(' ')[0].toLowerCase())} {t.start.toString().split(' ')[2]}</p>
                                </div>
                                <div className="flex items-center font-bold gap-1">
                                    <BiTimeFive /><p>{t.start.toString().split(' ')[4].split(':')[0]}:00</p>
                                </div>
                            </div>
                        ))

                        : <h3>Aún no hay funciones disponibles :(</h3>
                }
            </div>
        </>
    )
}

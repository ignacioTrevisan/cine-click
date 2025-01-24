'use client'


import { Datum } from '@/app/infraestructure/interfaces/billboard-response';
import { useRouter } from 'next/navigation';
import { Translanter, TranslateMonth } from '../../../../helpers/translanteText';
import { useState } from 'react';
import { BiArrowFromLeft, BiArrowFromRight, BiCalendar, BiTimeFive } from 'react-icons/bi';
import { Cart } from './cart';
import useTransmitionsSelectedStore from '@/app/store/transmitionsSelected';


interface Props {
    movieTransmitionFormatted?: { start: Date, end: Date, title: string, id: string }[]
    movieTransmitions?: Datum[]
}
export const CalendarElement = ({ movieTransmitionFormatted, movieTransmitions }: Props) => {
    const router = useRouter();
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [monthForView, setMonthForView] = useState(new Date().getMonth())
    const { movieId, clearMovieId } = useTransmitionsSelectedStore()

    const selectEvent = () => {
        const findTransmitions = movieTransmitions?.filter((t) => t.id === movieId);
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
                        clearMovieId()
                        return;
                    } setMonthForView(monthForView - 1)
                    clearMovieId()
                }} />
            </div>
            <h3>{TranslateMonth(monthArr[monthForView])}</h3>
            <div className='cursor-pointer hover:text-teal-600' onClick={() => {
                clearMovieId()
                if (monthForView === 11) {
                    setMonthForView(0)
                    clearMovieId()
                    return;
                }
                setMonthForView(monthForView + 1)
                clearMovieId()
            }}>

                <BiArrowFromLeft />
            </div>
            {/* <button className='btn btn-primary'>Siguiente</button> */}
        </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {

                    transmitionInScreen && transmitionInScreen.length > 0 ?
                        transmitionInScreen.map((t) => (
                            <Cart {...t} />
                        ))

                        : <h3>Aún no hay funciones disponibles :(</h3>
                }
            </div>
            {movieId &&
                <div className='w-full flex justify-center mt-5 '> <button onClick={selectEvent} className='w-[200px] text-sm h-[50px] text-white border rounded-md bg-teal-600'>Continuar con la compra</button></div>}
        </>
    )
}

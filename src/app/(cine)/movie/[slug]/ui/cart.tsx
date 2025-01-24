import { Translanter } from "@/app/helpers/translanteText"
import useTransmitionsSelectedStore from "@/app/store/transmitionsSelected";
import { BiCalendar, BiTimeFive } from "react-icons/bi"

interface Props {

    start: Date;

    id: string;

}
export const Cart = ({ start, id }: Props) => {
    const { setMovieId, movieId } = useTransmitionsSelectedStore()
    const selectEvent = (id: string) => {
        setMovieId(id)
    }
    return (
        <div key={id} className={`border rounded-md p-5 transition-all ${movieId === id ? 'bg-teal-600 translate-x-3   text-white' : 'hover:bg-slate-200'} cursor-pointer bg-white `} onClick={() => selectEvent(id)}>
            <div className="flex items-center font-bold gap-1">
                <BiCalendar /><p>{Translanter(start.toString().split(' ')[0].toLowerCase())} {start.toString().split(' ')[2]}</p>
            </div>
            <div className="flex items-center font-bold gap-1">
                <BiTimeFive /><p>{start.toString().split(' ')[4].split(':')[0]}:00</p>
            </div>
        </div>
    )
}

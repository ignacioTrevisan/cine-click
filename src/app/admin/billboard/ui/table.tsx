"use client"

import { SideBarStore } from "@/app/store/sideBarStore";
import { useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { addHours } from 'date-fns';
import './modal.css';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale/es';
import { useForm } from "react-hook-form";
import { Movie } from "@/app/infraestructure/interfaces/movies-response";
import { date } from "zod";
import { NewTransmition } from "@/app/core/use-cases/billboard/newTransmition";



interface Props {
    isMobile: boolean;
    movie: Movie[];
    theathers: { id: string, capacity: number, name: string }[];
}
interface FormValue {
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgColor: string;
    user: {
        _id: string;
        name: string;
    };
}
registerLocale('es', es)

setDefaultLocale('es');


interface FormInput {
    date: Date;
    Price: Number;
    MovieSelected: { id: number, movie: string };
    filterSalon: string;
}



export const Table = ({ isMobile, movie, theathers }: Props) => {
    console.log({ movie })
    const { handleSubmit, register, formState: { isValid }, getValues, setValue, watch } =
        useForm<FormInput>({

        })
    const [filterSalon, setFilterSalon] = useState(""); // Estado para el salón
    const [filterMovie, setFilterMovie] = useState(""); // Estado para el nombre de la película

    // Datos de ejemplo (reemplaza esto con tus datos reales)
    const tableData = [
        { id: 1, salon: "1", movie: "Batman", price: 100, tags: "Acción", fecha: "24/12/2024", hora: "22:00" },
        { id: 2, salon: "2", movie: "Barbie", price: 120, tags: "Comedia", fecha: "24/12/2024", hora: "22:00" },
        { id: 3, salon: "3", movie: "Oppenheimer", price: 150, tags: "Drama", fecha: "24/12/2024", hora: "22:00" },
        { id: 4, salon: "4", movie: "Dune", price: 130, tags: "Ciencia Ficción", fecha: "24/12/2024", hora: "22:00" },
        { id: 5, salon: "2", movie: "Frozen", price: 90, tags: "Animada", fecha: "24/12/2024", hora: "22:00" },
        { id: 6, salon: "1", movie: "Batman", price: 100, tags: "Acción", fecha: "24/12/2024", hora: "22:00" },
        { id: 7, salon: "2", movie: "Barbie", price: 120, tags: "Comedia", fecha: "24/12/2024", hora: "22:00" },
        { id: 8, salon: "3", movie: "Oppenheimer", price: 150, tags: "Drama", fecha: "24/12/2024", hora: "22:00" },
        { id: 9, salon: "4", movie: "Dune", price: 130, tags: "Ciencia Ficción", fecha: "24/12/2024", hora: "22:00" },
        { id: 10, salon: "2", movie: "Frozen", price: 90, tags: "Animada", fecha: "24/12/2024", hora: "22:00" },
        { id: 11, salon: "1", movie: "Batman", price: 100, tags: "Acción", fecha: "24/12/2024", hora: "22:00" },
        { id: 12, salon: "2", movie: "Barbie", price: 120, tags: "Comedia", fecha: "24/12/2024", hora: "22:00" },
        { id: 13, salon: "3", movie: "Oppenheimer", price: 150, tags: "Drama", fecha: "24/12/2024", hora: "22:00" },
        { id: 14, salon: "4", movie: "Dune", price: 130, tags: "Ciencia Ficción", fecha: "24/12/2024", hora: "22:00" },
        { id: 15, salon: "2", movie: "Frozen", price: 90, tags: "Animada", fecha: "24/12/2024", hora: "22:00" },
        { id: 16, salon: "1", movie: "Batman", price: 100, tags: "Acción", fecha: "24/12/2024", hora: "22:00" },
        { id: 17, salon: "2", movie: "Barbie", price: 120, tags: "Comedia", fecha: "24/12/2024", hora: "22:00" },
        { id: 18, salon: "3", movie: "Oppenheimer", price: 150, tags: "Drama", fecha: "24/12/2024", hora: "22:00" },
        { id: 19, salon: "4", movie: "Dune", price: 130, tags: "Ciencia Ficción", fecha: "24/12/2024", hora: "22:00" },
        { id: 20, salon: "2", movie: "Frozen", price: 90, tags: "Animada", fecha: "24/12/2024", hora: "22:00" },
        { id: 21, salon: "1", movie: "Batman", price: 100, tags: "Acción", fecha: "24/12/2024", hora: "22:00" },

    ];


    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [Movies, setMovies] = useState<{ id: string, movie: string }[]>(movie.map((movie) => ({ id: movie.id, movie: movie.title })));
    const [MovieSelected, setMovieSelected] = useState<{ id: string, movie: string }>()
    const [selectedSalon, setSelectedSalon] = useState("1");

    const handleOptionClick = (option: string) => {
        setMovieSelected(Movies.find((movie) => movie.movie === option));
        setIsOpen(false)
    }

    const filteredOptions = Movies.filter(option =>
        option.movie.toLowerCase().includes(search.toLowerCase())
    );

    const filteredData = tableData
        .filter((row) => {
            return (
                (filterSalon === "" || row.salon === filterSalon) &&
                (filterMovie === "" || row.movie.toLowerCase().includes(filterMovie.toLowerCase()))
            );
        })
        .sort((a, b) => b.id - a.id);


    const [formValue, setFormValue] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#fafafa',
        user: {
            _id: '',
            name: '',
        }
    })


    const onDateChange = (date: Date | null, texto: keyof FormValue) => {
        if (date) {
            setFormValue({
                ...formValue,
                [texto]: date,
            });
            setValue('date', date); // Set the date value in the form
        }
    };

    const { closeSideBar } = SideBarStore();


    const onSubmit = async (data: FormInput) => {
        if (!MovieSelected || !MovieSelected.id) return;
        const bodyFormPost = {
            movieId: MovieSelected.id,
            date: data.date.toISOString(),
            time: data.date.toString().split(' ')[4],
            Price: +data.Price,
            movieTheaterId: selectedSalon,
        }
        //TODO: AGREGAR MENSAJE DE ALERTA DE QUE SE SUBIO CORRECTAMENTE
        const resp = await NewTransmition(bodyFormPost);
    }

    return (
        <div className="p-4" onClick={() => isMobile ? closeSideBar() : {}}>
            {/* Filtros */}
            <div className="mb-4 flex flex-wrap gap-4 items-center">
                {/* Combobox de salones */}
                <div className="flex flex-col w-full sm:w-auto">
                    <label htmlFor="salon" className="text-sm font-medium">
                        Filtrar por Salón:
                    </label>
                    <select
                        id="salon"
                        className="p-2 border rounded-md bg-gray-200"
                        value={filterSalon}
                        onChange={(e) => setFilterSalon(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="1">Salon 1</option>
                        <option value="2">Salon 2</option>
                        <option value="3">Salon 3</option>
                        <option value="4">Salon 4</option>
                    </select>
                </div>

                {/* Input para el nombre de la película */}
                <div className="flex flex-col w-full sm:w-auto">
                    <label htmlFor="movie" className="text-sm font-medium">
                        Buscar por Película:
                    </label>
                    <input
                        id="movie"
                        type="text"
                        placeholder="Nombre de la película"
                        className="p-2 border rounded-md bg-gray-200"
                        value={filterMovie}
                        onChange={(e) => setFilterMovie(e.target.value)}
                    />
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto h-[250px]">
                <table className="table-auto border-collapse w-full">
                    <thead>
                        <tr>
                            <th className="border px-2 py-1 text-xs sm:text-sm">ID</th>
                            <th className="border px-2 py-1 text-xs sm:text-sm">Salón</th>
                            <th className="border px-2 py-1 text-xs sm:text-sm">Película</th>
                            <th className="border px-2 py-1 text-xs sm:text-sm">Tags</th>
                            <th className="border px-2 py-1 text-xs sm:text-sm">Fecha</th>
                            <th className="border px-2 py-1 text-xs sm:text-sm">Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row) => (
                            <tr key={row.id}>
                                <td className="border px-2 py-1 text-xs sm:text-sm">{row.id}</td>
                                <td className="border px-2 py-1 text-xs sm:text-sm">{row.salon}</td>
                                <td className="border px-2 py-1 text-xs sm:text-sm">{row.movie}</td>
                                <td className="border px-2 py-1 text-xs sm:text-sm">{row.tags}</td>
                                <td className="border px-2 py-1 text-xs sm:text-sm">{row.fecha}</td>
                                <td className="border px-2 py-1 text-xs sm:text-sm">{row.hora}</td>
                            </tr>
                        ))}
                        {filteredData.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-4">
                                    No hay resultados que coincidan con los filtros.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            {/* Nueva pelicula */}
            <div className="w-full h-auto justify-center grid mt-3 border-b-2 ">
                <h3>Configurar nueva proyección</h3>
            </div>


            <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-1 sm:grid-cols-3 items-end mt-5 gap-3" >

                <div className="grid">

                    <span className="text-sm font-medium">
                        Salón
                    </span>
                    <select
                        id="salon"
                        className="p-2 border rounded-md bg-gray-200"
                        value={selectedSalon}
                        onChange={(e) => setSelectedSalon(e.target.value)}

                    >
                        {theathers.map((t) => (
                            <option key={t.id} value={t.id}>{t.name}</option>

                        ))}
                    </select>

                </div>
                <div className=" ml-2 w-[300px] relative">
                    <span>Pelicula</span>
                    <input
                        type="text"
                        value={MovieSelected?.movie || ""}
                        // onChange={(e) => console.log('hola')}

                        {...register('MovieSelected', { required: true })}
                        onClick={() => setIsOpen(!isOpen)}

                        placeholder="Buscar..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />


                    {isOpen && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleOptionClick(option.movie)}
                                        className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                                    >
                                        {option.movie}  -ID {option.id}
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-2 text-gray-500">No hay resultados</li>
                            )}
                        </ul>
                    )}
                </div>
                <div className="grid ml-2">
                    <span>Configurar fecha</span>
                    <div className="border rounded-sm p-2">

                        <DatePicker
                            selected={formValue?.end}
                            className='form-control'
                            minDate={formValue?.start}
                            dateFormat={'Pp'}
                            timeIntervals={180}
                            showTimeSelect
                            onChange={(date) => onDateChange(date, 'end')}
                            timeCaption='Hora'

                        />
                    </div>
                </div>
                {/* <button className="btn btn-primary" onClick={() => { console.log(MovieSelected) }}>Confirmar</button> */}
                <div className="grid ml-2">
                    <span>Precio</span>
                    <input
                        type="number"
                        step="10"
                        min="0"
                        max={180}
                        {...register('Price', { required: true })}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        placeholder="Precio en usd"
                        defaultValue={0}
                    />
                </div>
                <button className="btn btn-primary" type="submit">Confirmar</button>
            </form>

        </div >
    );
};

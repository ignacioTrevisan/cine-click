"use client"

import { PayPalButton } from "@/app/components/paypal/PayPalButton"
import { Datum } from "@/app/infraestructure/interfaces/billboard-response"
import { useEffect, useState } from "react"

interface Props {
    transmisions: Datum[]
}
export const TicketTables = ({ transmisions }: Props) => {

    const [pelicula, setPelicula] = useState("Avengers: Endgame")
    const [transmitionSelected, setTransmitionSelected] = useState(transmisions[0])
    const [cantidad, setCantidad] = useState(1)
    const [total, setTotal] = useState(cantidad * transmitionSelected.Price);

    useEffect(() => {
        setTotal(cantidad * transmitionSelected.Price);
        console.log(transmitionSelected)
    }, [cantidad, transmitionSelected]);


    const [salon, setSalon] = useState(transmisions.length > 0 ? transmisions[0].movieTheater.id : "");
    const changeTransmition = (id: string) => {
        const newOptionSelected = transmisions.find((t) => t.movieTheater.id === id);
        if (!newOptionSelected) return;

        setSalon(newOptionSelected.movieTheater.id);
        setTransmitionSelected(newOptionSelected);
        setCantidad(0)
        //TODO: Todavia hay que controlar el stock de entradas
    };

    const cambiarCantidad = (nuevaCantidad: string) => {
        if ((transmitionSelected.movieTheater.capacity - transmitionSelected.TicketSold) >= +nuevaCantidad) {

            setCantidad(Number(nuevaCantidad))
        } else {
            if (transmisions.length > 1) {
                const nuevoSalon = transmisions.find((t) => t.movieTheater.id !== transmitionSelected.movieTheater.id);

                alert(`No hay suficiente espacio en el salón para esa cantidad de tickets, por favor pruebe cambiando a ${nuevoSalon?.movieTheater.name}`)
            } else {
                alert('No hay suficiente espacio en el salón para esa cantidad de tickets, por favor pruebe cambiando de horario o fecha')

            }
        }
    }
    return (
        <div className="pt-[60px]">
            <div className="w-full absolute flex justify-center">
                <h1 className="text-2xl font-bold">Generar Orden de Compra</h1>
            </div>
            <div className="w-full p-2 h-screen justify-center items-center flex">
                <div className="grid md:grid-cols-2 gap-6 ">
                    {/* Recuadro de selección */}
                    <div className="border rounded-lg p-4">
                        <div>
                            <h1 className="text-xl font-bold mb-3">Detalles de la Película</h1>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Título de la Película</h3>
                                <p>{transmitionSelected.movie.title}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Horario de Transmisión</h3>
                                <p>{transmisions[0].time}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Seleccione salón</h3>
                                <select
                                    onChange={(e) => changeTransmition(e.target.value)}
                                    value={salon}
                                >
                                    {transmisions.map((t) => (
                                        <option key={t.id} value={t.movieTheater.id}>
                                            {t.movieTheater.name}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Precio por Entrada</h3>
                                <p>${transmitionSelected.Price.toFixed(2)}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 ">Cantidad de Entradas</h3>
                                <input
                                    type="number"
                                    min="1"
                                    value={cantidad}
                                    className={`border rounded-sm p-2 ${cantidad === 0 && 'border-yellow-200'}`}
                                    onChange={(e) => cambiarCantidad(e.target.value)}
                                />
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>

                    {/* Recuadro de resumen */}
                    <div className="border rounded-lg p-4">
                        <div>
                            <h1 className="text-xl font-bold mb-3">Resumen de Compra</h1>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <h3 className="font-semibold mb-2">Película</h3>
                                <p>{pelicula}</p>
                            </div>
                            <div className="flex gap-2">
                                <h3 className="font-semibold mb-2">Horario</h3>
                                <p>{transmisions[0].time}</p>
                            </div>
                            <div className="flex gap-2">
                                <h3 className="font-semibold mb-2">Salón</h3>
                                <p>{transmitionSelected.movieTheater.name || "No seleccionado"}</p>
                            </div>
                            <div className="flex gap-2 ">
                                <h3 className="font-semibold mb-2">Cantidad de Entradas</h3>
                                <p>{cantidad}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Total a Pagar</h3>
                                <p className="text-xl font-bold">${total.toFixed(2)}</p>
                            </div>
                            <PayPalButton totalToPay={total.toString()} movieTransmitionId={transmitionSelected.id} createdAt={new Date().toISOString().split('T')[0]} quantity={cantidad} userId="2162cb21-d3c3-484f-93fe-1b9b63d4abe0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

"use client"

import { useState } from "react"

export const TicketTables = () => {

    const [pelicula, setPelicula] = useState("Avengers: Endgame")
    const [horario, setHorario] = useState("14:30")
    const [salon, setSalon] = useState("")
    const [cantidad, setCantidad] = useState(1)
    const precioEntrada = 10 // Precio fijo por entrada

    const total = cantidad * precioEntrada
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
                                <p>{pelicula}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Horario de Transmisión</h3>
                                <p>{horario}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Seleccionar Salón</h3>
                                <select onChange={(e) => setSalon(e.target.value)} value={salon}>

                                    <option value="">Seleccione un salón</option>
                                    <option value="sala1">Sala 1</option>
                                    <option value="sala2">Sala 2</option>
                                    <option value="sala3">Sala 3</option>
                                </select>

                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Precio por Entrada</h3>
                                <p>${precioEntrada.toFixed(2)}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Cantidad de Entradas</h3>
                                <input
                                    type="number"
                                    min="1"
                                    value={cantidad}
                                    onChange={(e) => setCantidad(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Recuadro de resumen */}
                    <div className="border rounded-lg p-4">
                        <div>
                            <h1 className="text-xl font-bold mb-3">Resumen de Compra</h1>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Película</h3>
                                <p>{pelicula}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Horario</h3>
                                <p>{horario}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Salón</h3>
                                <p>{salon || "No seleccionado"}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Cantidad de Entradas</h3>
                                <p>{cantidad}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Total a Pagar</h3>
                                <p className="text-xl font-bold">${total.toFixed(2)}</p>
                            </div>
                            <button type="button" className={`w-full  ${salon !== '' ? 'btn btn-primary cursor-pointer' : 'btn btn-disabled cursor-no-drop'} `} disabled={!salon}>
                                Confirmar Compra
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

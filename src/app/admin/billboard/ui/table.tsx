"use client"

import { useState } from "react";

export const Table = () => {
    const [filterSalon, setFilterSalon] = useState(""); // Estado para el salón
    const [filterMovie, setFilterMovie] = useState(""); // Estado para el nombre de la película

    // Datos de ejemplo (reemplaza esto con tus datos reales)
    const tableData = [
        { id: 1, salon: "1", movie: "Batman", price: 100, tags: "Acción", fecha: '24/12/2024', hora: '22:00' },
        { id: 2, salon: "2", movie: "Barbie", price: 120, tags: "Comedia", fecha: '24/12/2024', hora: '22:00' },
        { id: 3, salon: "3", movie: "Oppenheimer", price: 150, tags: "Drama", fecha: '24/12/2024', hora: '22:00' },
        { id: 4, salon: "4", movie: "Dune", price: 130, tags: "Ciencia Ficción", fecha: '24/12/2024', hora: '22:00' },
        { id: 5, salon: "2", movie: "Frozen", price: 90, tags: "Animada", fecha: '24/12/2024', hora: '22:00' },
    ];
    const filteredData = tableData.filter((row) => {
        return (
            (filterSalon === "" || row.salon === filterSalon) &&
            (filterMovie === "" || row.movie.toLowerCase().includes(filterMovie.toLowerCase()))
        );
    });
    return (
        <div className="p-4">
            {/* Filtros */}
            <div className="mb-4 flex gap-4 items-center">
                {/* Combobox de salones */}
                <div className="flex flex-col">
                    <label htmlFor="salon">Filtrar por Salón:</label>
                    <select
                        id="salon"
                        className="p-2 border rounded-md bg-gray-200"
                        value={filterSalon}
                        onChange={(e) => setFilterSalon(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="1">Salón 1</option>
                        <option value="2">Salón 2</option>
                        <option value="3">Salón 3</option>
                        <option value="4">Salón 4</option>
                    </select>
                </div>

                {/* Input para el nombre de la película */}
                <div className="flex flex-col">
                    <label htmlFor="movie">Buscar por Película:</label>
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
            <div className="overflow-x-auto">
                <table className="table-auto border-collapse w-full">
                    <thead>
                        <tr>
                            <th style={{ width: "5%" }} className="border px-4 py-2">ID</th>
                            <th style={{ width: "5%" }} className="border px-4 py-2">Salón</th>
                            <th style={{ width: "30%" }} className="border px-4 py-2">Película</th>
                            <th style={{ width: "25%" }} className="border px-4 py-2">Tags</th>
                            <th style={{ width: "25%" }} className="border px-4 py-2">Fecha</th>
                            <th style={{ width: "25%" }} className="border px-4 py-2">Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row) => (
                            <tr key={row.id}>
                                <td className="border px-4 py-2">{row.id}</td>
                                <td className="border px-4 py-2">{row.salon}</td>
                                <td className="border px-4 py-2">{row.movie}</td>
                                <td className="border px-4 py-2">{row.tags}</td>
                                <td className="border px-4 py-2">{row.fecha}</td>
                                <td className="border px-4 py-2">{row.hora}</td>
                            </tr>
                        ))}
                        {filteredData.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-4">
                                    No hay resultados que coincidan con los filtros.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

"use client"

import { SideBarStore } from "@/app/store/sideBarStore"
import Image from "next/image"
import { useState } from "react"
import { SaveChangesButton } from "./saveChangesButton"

interface Props {
    isMobile: boolean
}
export const Table = ({ isMobile }: Props) => {

    const [search, setSearch] = useState("")
    const { closeSideBar } = SideBarStore();
    const tableData = [
        {
            img: '/images/avengers.jpg',
            ID: 'ABC123',
            name: 'avengers',
            Tags: 'Acción',
            Adult: false
        },
        {
            img: '/images/kraven.jpg',
            ID: 'DEF456',
            name: 'kraven',
            Tags: 'Aventura',
            Adult: false
        },
        {
            img: '/images/bagman2.jpg',
            ID: 'GHI789',
            name: 'bagman2',
            Tags: 'Acción',
            Adult: true
        },
        {
            img: '/images/Godzilla.jpg',
            ID: 'JKL012',
            name: 'Godzilla',
            Tags: 'Acción',
            Adult: false
        },
        {
            img: '/images/transformer.jpg',
            ID: 'MNO345',
            name: 'transformer',
            Tags: 'Acción',
            Adult: false
        },
        {
            img: '/images/Venom.jpg',
            ID: 'PQR678',
            name: 'Venom',
            Tags: 'Acción',
            Adult: false
        }
    ]


    return (
        <div className="grid mt-10 ml-2 w-full" onClick={() => (isMobile ? closeSideBar() : {})}>
            <SaveChangesButton />
            <label>Buscar por nombre</label>
            <input
                type="text"
                className="p-1 border rounded-md w-full md:w-[300px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="overflow-x-auto w-full mt-4 h-[450px]">
                <table className="table-auto min-w-[700px] w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border border-gray-300">Foto</th>
                            <th className="px-4 py-2 border border-gray-300">ID</th>
                            <th className="px-4 py-2 border border-gray-300">Nombre</th>
                            <th className="px-4 py-2 border border-gray-300">Tags</th>
                            <th className="px-4 py-2 border border-gray-300">+18</th>
                            <th className="px-4 py-2 border border-gray-300">Nuevos estrenos</th>
                            <th className="px-4 py-2 border border-gray-300">Proximamente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((m) => (
                            <tr key={m.ID}>
                                <td className="border px-4 py-2">
                                    <Image src={m.img} alt={`${m.name} image`} width={150} height={150} />
                                </td>
                                <td className="border px-4 py-2">{m.ID}</td>
                                <td className="border px-4 py-2">{m.name}</td>
                                <td className="border px-4 py-2">{m.Tags}</td>
                                <td className="border px-4 py-2">{m.Adult ? 'Si' : 'No'}</td>
                                <td className="border px-4 py-2">
                                    <input type="checkbox" value={'false'} />
                                </td>
                                <td className="border px-4 py-2">
                                    <input type="checkbox" value={'false'} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

"use client"

import { SideBarStore } from "@/app/store/sideBarStore"
import Image from "next/image"
import { useState } from "react"
import { Movie } from "@/app/infraestructure/interfaces/movies-response"
import { NewRelease, Soon } from "@/app/infraestructure/interfaces/billboardConfig-response"
import { CheckBox } from "./checkBox"

interface Props {
    isMobile: boolean,
    movie: Movie[],
    billboardConfig: { soon: Soon[], newRelease: NewRelease[] }
}
export const Table = ({ isMobile, movie, billboardConfig }: Props) => {

    const [search, setSearch] = useState("")
    const { closeSideBar } = SideBarStore();
    const filterData = movie.filter((f) => f.title.includes(search))

    const toogleMode = (id: string, modo: string) => {
        console.log({ id })
        console.log({ modo })
    }
    return (
        <div className="grid mt-10 ml-2 w-full" onClick={() => (isMobile ? closeSideBar() : {})}>
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
                        {filterData.map((m) => (
                            <tr key={m.id}>
                                <td className="border px-4 py-2">
                                    <Image src={m.PrincipalImage[0].Url} alt={`${m.title} image`} width={150} height={150} />
                                </td>
                                <td className="border px-4 py-2">{m.id}</td>
                                <td className="border px-4 py-2">{m.title}</td>
                                <td className="border px-4 py-2">{m.tags.join('-')}</td>
                                <td className="border px-4 py-2">{m.isAdult ? 'Si' : 'No'}</td>
                                <td className="border px-4 py-2">
                                    <CheckBox
                                        isChecked={!!billboardConfig.newRelease.find((f) => f.movieId === m.id)}
                                        id={m.id}
                                        mode="NewRelease"
                                    />

                                </td>
                                <td className="border px-4 py-2">
                                    <CheckBox
                                        isChecked={!!billboardConfig.soon.find((f) => f.movieId === m.id)}
                                        id={m.id}
                                        mode="soon"
                                    />

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

"use client"

import { useState } from "react"

export const SaveChangesButton = () => {
    const [active, setActive] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    return (
        <div className="absolute right-5 bottom-5">

            <button className={`${active ? 'block' : 'hidden'} btn ${isLoading ? 'btn-disabled cursor-no-drop' : 'btn-primary cursor-pointer'}  p-2`}>Guardar cambios</button>
        </div>
    )
}

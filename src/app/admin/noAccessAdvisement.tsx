"use client"
import { IoPlayBackCircle } from 'react-icons/io5'

export const NoAccessAdvisement = () => {
    const isBack = () => {
        window.location.replace('/')
    }
    return (
        <><h3>No poseé permisos para continuar</h3>
            <div className="flex ml-2 bg-blue-400 hover:bg-blue-500 rounded-md p-2 items-center w-[120px] justify-end"
                onClick={isBack}
            >
                <IoPlayBackCircle className="mr-2 text-white" />
                <button className="  text-white">Regresar</button>
            </div>
        </>
    )
}

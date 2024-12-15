import React from 'react'
import { IoClipboardOutline, IoLogInOutline, IoPersonOutline, IoSearchOutline } from 'react-icons/io5'

export const Navbar = () => {
    return (
        <div className="fixed z-10 w-full bg-gray-200 flex justify-center items-center">


            <div className="relative my-3 w-[200px] sm:w-[400px]">
                <IoSearchOutline size={20} className='absolute top-2 left-2' />

                <input
                    type='text'
                    placeholder='Buscar'
                    className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
                />
            </div>

            <div className='flex justify-center'>
                <div className="relative my-3 ml-2 items-center sm:flex hidden ">
                    <IoPersonOutline size={20} className='absolute  left-2' />

                    <button
                        className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500'
                    >
                        Perfil
                    </button>
                </div>
                <div className="relative my-3 ml-2 items-center sm:hidden flex h-8 ">
                    <IoPersonOutline size={20} className='absolute left-2' />

                    <button
                        className='w-full bg-gray-50 rounded  py-1 h-full pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500'
                    />

                </div>
                <div className="relative my-3 ml-2 items-center sm:flex hidden ">
                    <IoLogInOutline size={20} className='absolute  left-2' />

                    <button
                        className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500'
                    >
                        Cerrar sesión
                    </button>
                </div>
                <div className="relative my-3 ml-2 items-center sm:hidden flex h-8 ">
                    <IoLogInOutline size={20} className='absolute left-2' />

                    <button
                        className='w-full bg-gray-50 rounded  py-1 h-full pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500'
                    />

                </div>


            </div>

        </div>
    )
}

'use client'
import { IoConstructOutline, IoLogInOutline, IoPersonOutline, IoSearchOutline } from 'react-icons/io5'
import { DeleteJWT } from '../core/use-cases/auth/deleteJWT'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { User } from '../core/entities/userEntities';
import { GetUserInfo } from '../core/use-cases/user/getUserInfo'

export const Navbar = () => {
    const [User, setUser] = useState<User>()
    useEffect(() => {
        const getUser = async () => {
            const resp = await GetUserInfo();
            if (resp.ok) {
                setUser(resp.data);
                setLoaded(true)
            }
        }
        getUser();

    }, [])

    const [loaded, setLoaded] = useState(false)

    const closeSession = async () => {
        const resp = await DeleteJWT();
        if (resp.ok) {
            window.location.replace('/auth/login')
        }
    }

    return (

        loaded && User &&
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
                {User.role === 'user' ?
                    <>

                        <Link href={'/profile'} className="relative my-3 ml-2 items-center sm:flex hidden ">
                            <IoPersonOutline size={20} className='absolute  left-2' />

                            <button
                                className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500'
                            >
                                Perfil
                            </button>
                        </Link>
                        <Link href={'/profile'} className="relative my-3 ml-2 items-center sm:hidden flex h-8 ">
                            <IoPersonOutline size={20} className='absolute left-2' />

                            <button
                                className='w-full bg-gray-50 rounded  py-1 h-full pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500'
                            />

                        </Link>
                    </>
                    :
                    <>

                        <Link href={'/admin'} className="relative my-3 ml-2 items-center sm:flex hidden ">
                            <IoConstructOutline size={20} className='absolute  left-2' />
                            <button
                                className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500'
                            >
                                Configuracion
                            </button>
                        </Link>
                        <Link href={'/admin'} className="relative my-3 ml-2 items-center sm:hidden flex h-8 ">
                            <IoConstructOutline size={20} className='absolute left-2' />

                            <button
                                className='w-full bg-gray-50 rounded  py-1 h-full pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500'
                            />

                        </Link>
                    </>

                }
                <div className="relative my-3 ml-2 items-center sm:flex hidden "
                    onClick={() => closeSession()}
                >
                    <IoLogInOutline size={20} className='absolute  left-2'

                    />

                    <button
                        className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500'
                    >
                        Cerrar sesión
                    </button>
                </div>
                <div className="relative my-3 ml-2 items-center sm:hidden flex h-8 "
                    onClick={() => closeSession()}
                >
                    <IoLogInOutline size={20} className='absolute left-2' />

                    <button
                        className='w-full bg-gray-50 rounded  py-1 h-full pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500'
                    />

                </div>


            </div>

        </div>
    )
}

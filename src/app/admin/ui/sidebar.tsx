'use client'
import { SidebarButton } from './sidebarButton'
import { IoAddOutline, IoFileTrayStackedOutline, IoHomeOutline, IoReorderFourOutline, IoSettingsOutline } from 'react-icons/io5'
import { BiMoviePlay } from 'react-icons/bi'
import { TiPlusOutline } from 'react-icons/ti'

import { SideBarStore } from '@/app/store/sideBarStore'

export const Sidebar = () => {
    const { isOpenSideBar, openSideBar, closeSideBar } = SideBarStore()
    return (
        <>

            <div className={`${isOpenSideBar ? 'hidden' : 'block'} relative left-0 top-0 sm:hidden w-[40px] flex items-start justify-start cursor-pointer`}

            >   <button onClick={() => openSideBar()}>

                    <IoReorderFourOutline size={34} />
                </button>
            </div>
            <div className={` ${isOpenSideBar ? 'sticky h-screen w-[300px]' : 'absolute w-[0px]'}  ${isOpenSideBar ? 'left-0' : '-left-[270px]'}  sm:left-0 transition-all pt-[10px] ${isOpenSideBar && 'bg-gray-300'}  sm:bg-gray-300 overflow-hidden`}>
                <div className={`${isOpenSideBar ? 'block' : 'hidden'} `}>
                    <div onClick={() => closeSideBar()}>

                        <SidebarButton text='Volver al inicio' icon={<IoHomeOutline />} url='#' />
                    </div>
                    <div className='mt-10 sm:m-5' />
                    <div onClick={() => closeSideBar()}>

                        <SidebarButton text='Todas las peliculas' icon={<IoFileTrayStackedOutline />} url='#' />
                    </div>
                    <div className='mt-10 sm:m-5' />
                    <div onClick={() => closeSideBar()}>

                        <SidebarButton text='Agregar nueva pelicula' icon={<TiPlusOutline />} url='#' />
                    </div>
                    <div className='mt-10 sm:m-5' />
                    <div onClick={() => closeSideBar()}>

                        <SidebarButton text='Cartelera' icon={<BiMoviePlay />} url='#' />
                    </div>
                    <div className='mt-10 sm:m-5' />
                    <div onClick={() => closeSideBar()}>

                        <SidebarButton text='Configuracion de salas' icon={<IoSettingsOutline />} url='#' />
                    </div>
                </div>
            </div>
        </>
    )
}

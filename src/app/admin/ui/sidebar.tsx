'use client'
import { SidebarButton } from './sidebarButton'
import { IoFileTrayStackedOutline, IoHomeOutline, IoReorderFourOutline, IoSettingsOutline } from 'react-icons/io5'
import { BiMoviePlay } from 'react-icons/bi'
import { TiPlusOutline } from 'react-icons/ti'

import { SideBarStore } from '@/app/store/sideBarStore'

export const Sidebar = () => {

    const { isOpenSideBar, openSideBar } = SideBarStore()
    return (
        <div className='z-10 h-screen'>

            <div className={`${isOpenSideBar ? 'hidden' : 'block'} absolute left-0 top-0 sm:hidden w-[40px] flex items-start justify-start cursor-pointer `}

            >   <button onClick={() => openSideBar()}>

                    <IoReorderFourOutline size={34} />
                </button>
            </div>
            <div className={` ${isOpenSideBar ? 'sticky  w-[300px]' : 'absolute w-[0px]'}  ${isOpenSideBar ? 'left-0' : '-left-[270px]'} block sm:left-0 transition-all pt-[10px] h-screen min-h-screen ${isOpenSideBar && 'bg-gray-300'}  sm:bg-gray-300 overflow-hidden`}>
                <div className={`${isOpenSideBar ? 'block' : 'hidden'} `}>
                    <div >

                        <SidebarButton text='Volver al inicio' path='' icon={<IoHomeOutline />} url='/' />
                    </div>
                    <div className='mt-10 sm:m-5' />
                    <div >

                        <SidebarButton text='Peliculas a proyectar' path='/admin/billboard' icon={<IoFileTrayStackedOutline />} url='/admin/billboard' />
                    </div>
                    <div className='mt-10 sm:m-5' />
                    <div >

                        <SidebarButton text='Agregar nueva pelicula' path='/admin/newMovie' icon={<TiPlusOutline />} url='/admin/newMovie' />
                    </div >
                    <div className='mt-10 sm:m-5' />
                    <div >

                        <SidebarButton text='Configurar cartelera' path='/admin/billboardConfig' icon={<BiMoviePlay />} url='/admin/billboardConfig' />
                    </div >
                    <div className='mt-10 sm:m-5' />
                    <div >

                        <SidebarButton text='Configuracion de salas' path='' icon={<IoSettingsOutline />} url='#' />
                    </div>
                </div >
            </div >
        </div>
    )
}

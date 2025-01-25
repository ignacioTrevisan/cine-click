'use client'
import { IoConstructOutline, IoHomeOutline, IoLogInOutline, IoPersonOutline, IoSearchOutline } from 'react-icons/io5'
import { DeleteJWT } from '../core/use-cases/auth/deleteJWT'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { User } from '../core/entities/userEntities';
import { GetUserInfo } from '../core/use-cases/user/getUserInfo'
import { BiHome, BiSearch } from 'react-icons/bi'
import style from './style.module.css'
import { useRouter } from 'next/navigation'

interface Props {
    forSearch: {
        title: string,
        slug: string
    }[]
}
export const Navbar = ({ forSearch }: Props) => {
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
    const [isScrolled, setIsScrolled] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const [loaded, setLoaded] = useState(false)

    const closeSession = async () => {
        const resp = await DeleteJWT();
        if (resp.ok) {
            window.location.replace('/auth/login')
        }
    }

    const [textForSearch, setTextForSearch] = useState('')
    const [moviesFind, setMoviesFind] = useState<{ title: string, slug: string }[] | undefined>(forSearch);
    useEffect(() => {
        if (!moviesFind) return;
        const search = forSearch.filter((f) => f.title.toLowerCase().includes(textForSearch.toLowerCase()));
        setMoviesFind(search);
    }, [textForSearch])
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const router = useRouter()
    return (

        loaded && User &&
        <nav className={`bg-white shadow-md fixed w-full z-10 ${style.animacion}  ${isScrolled ? style.scrolled : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`${isSearchOpen ? 'grid h-32 w-full' : 'flex h-16 items-center justify-between'} `}>
                    <div className='w-full flex justify-between  ' >


                        <div className={`flex-shrink-0 h-full items-center mt-3 md:mt-1 cursor-pointer`} onClick={() => window.location.replace('/')}>
                            <h1 className="text-xl font-bold text-teal-600">CineClick </h1>
                        </div>

                        <div className="hidden md:block flex-1 max-w-lg mx-8">


                            <div className='relative'>

                                <IoSearchOutline size={20} className='absolute top-2 left-2' />

                                <input
                                    type='text'
                                    placeholder='Buscar'
                                    value={textForSearch}
                                    onChange={(e) => setTextForSearch(e.target.value)}
                                    className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-teal-600'
                                />

                                {moviesFind && moviesFind.length > 0 && textForSearch.length > 2 && (
                                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-[150px]">

                                        {moviesFind.map((option, index) => (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    window.location.replace(`/movie/${option.slug}`)
                                                }}
                                                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                                            >
                                                {option.title}
                                            </li>
                                        ))}

                                    </ul>
                                )}
                            </div>
                        </div>


                        <div className='flex items-center'>


                            <div
                                className="relative ml-2 items-center md:hidden flex h-8 hover:outline-none hover:border-teal-600 rounded border-b-2 cursor-pointer hover:text-teal-600">

                                <BiSearch size={20} className="absolute left-2 rounded" />
                                <button
                                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                                    className='w-full bg-gray-50  py-1 h-full pr-10  text-sm border-gray-200 rounded '
                                />
                            </div>
                            {User.role === 'user' ?
                                window.location.pathname === '/' ?

                                    <>
                                        <div className="hidden md:flex items-center space-x-3">

                                            <div onClick={() => window.location.replace('/profile')}
                                                className="relative ml-2 items-center md:flex hidden text-sm rounded border-b-2 cursor-pointer border-gray-200 bg-gray-50 hover:border-teal-600"
                                            >
                                                <IoPersonOutline size={20} className='absolute  left-2' />

                                                <button
                                                    className="w-full pl-10 py-1 pr-10 outline-none"
                                                >
                                                    Perfil
                                                </button>
                                            </div>
                                        </div>
                                        <div onClick={() => router.push('/profile')}
                                            className="relative ml-2 items-center md:hidden flex h-8 hover:outline-none hover:border-teal-600 rounded border-b-2 cursor-pointer hover:text-teal-600">
                                            <IoPersonOutline size={20} className='absolute left-2' />

                                            <button
                                                className='w-full bg-gray-50  py-1 h-full pr-10  text-sm border-gray-200 rounded'
                                            />

                                        </div>


                                    </>
                                    :
                                    <>

                                        <div
                                            onClick={() => window.location.replace('/')}
                                            className="relative ml-2 items-center md:flex hidden text-sm rounded cursor-pointer border-b-2 border-gray-200 bg-gray-50 hover:border-teal-600"
                                        >
                                            <IoHomeOutline size={20} className="absolute left-2" />

                                            <button
                                                className="w-full pl-10 py-1 pr-10 outline-none"
                                            >
                                                Inicio
                                            </button>
                                        </div>

                                        <div onClick={() => router.push('/')}
                                            className="relative ml-2 items-center md:hidden flex h-8 hover:outline-none hover:border-teal-600 rounded border-b-2 cursor-pointer hover:text-teal-600">
                                            <BiHome size={20} className='absolute left-2' />

                                            <button
                                                className='w-full bg-gray-50  py-1 h-full pr-10  text-sm border-gray-200 rounded'
                                            />

                                        </div>
                                    </>

                                :

                                //VERSION ADMIN

                                window.location.pathname === '/' ?
                                    <>

                                        {/* VERSION WINDOW BOTTON CONFIGURATION */}

                                        <Link href={'/admin'}
                                            className="relative ml-2 items-center md:flex hidden text-sm rounded border-b-2 cursor-pointer border-gray-200 bg-gray-50 hover:border-teal-600"
                                        >
                                            <IoConstructOutline size={20} className='absolute  left-2' />
                                            <button
                                                className="w-full pl-10 py-1 pr-10 outline-none"
                                            >
                                                Configuracion

                                            </button>
                                        </Link>

                                        {/* VERSION MOBILE BOTTON CONFIGURATION */}
                                        <Link href={'/admin'} className="relative ml-2  items-center md:hidden flex h-8 hover:outline-none hover:text-teal-600 hover:border-teal-600 rounded border-b-2">
                                            <IoConstructOutline size={20} className='absolute left-2' />

                                            <button
                                                className='w-full bg-gray-50  py-1 h-full pr-10  text-sm border-gray-200 rounded'
                                            />

                                        </Link>
                                    </>
                                    :
                                    <>

                                        <div
                                            onClick={() => window.location.replace('/')}
                                            className="relative ml-2 items-center md:flex hidden text-sm rounded border-b-2 cursor-pointer border-gray-200 bg-gray-50 hover:border-teal-600"
                                        >
                                            <BiHome size={20} className="absolute left-2" />

                                            <button
                                                className="w-full pl-10 py-1 pr-10 outline-none"
                                            >
                                                Inicio
                                            </button>
                                        </div>

                                        <div onClick={() => router.push('/')}
                                            className="relative ml-2 items-center md:hidden flex h-8 hover:outline-none hover:border-teal-600 rounded border-b-2 cursor-pointer hover:text-teal-600">
                                            <BiHome size={20} className='absolute left-2' />

                                            <button
                                                className='w-full bg-gray-50  py-1 h-full pr-10  text-sm border-gray-200 rounded'
                                            />

                                        </div>



                                    </>

                            }

                            <div

                                className="relative ml-2 items-center md:flex hidden text-sm rounded border-b-2 cursor-pointer border-gray-200 bg-gray-50 hover:border-teal-600"
                                onClick={() => closeSession()}
                            >
                                <IoLogInOutline size={20} className='absolute  left-2'

                                />

                                <button
                                    className="w-full pl-10 py-1 pr-10 outline-none"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                            <div
                                className="relative my-3 ml-2 items-center md:hidden flex h-8 border-b-2 rounded  border-gray-200 hover:outline-none hover:border-teal-600 hover:text-teal-600 cursor-pointer "
                                onClick={() => closeSession()}
                            >
                                <IoLogInOutline size={20} className='absolute left-2' />

                                <button
                                    className='w-full bg-gray-50 rounded  py-1 h-full pr-10 text-sm '
                                />

                            </div>

                        </div>
                    </div>
                    {isSearchOpen && (
                        <div className="md:hidden py-3 px-2">

                            <div className="relative">
                                <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={textForSearch}
                                    onChange={(e) => setTextForSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    placeholder="Buscar películas..."
                                    autoFocus
                                />
                                {moviesFind && moviesFind.length > 0 && textForSearch.length > 2 && (
                                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-[150px]">

                                        {moviesFind.map((option, index) => (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    window.location.replace(`/movie/${option.slug}`)
                                                }}
                                                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                                            >
                                                {option.title}
                                            </li>
                                        ))}

                                    </ul>
                                )}
                            </div>

                        </div>
                    )}

                </div>
            </div>
        </nav >
    )
}
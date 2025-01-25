import type { Metadata } from 'next'
import { redirect } from 'next/navigation';
import { verifyJWT } from '../core/use-cases/auth/verifyJWT';
import { IoFilmOutline } from 'react-icons/io5';
import { TbMailBitcoin } from 'react-icons/tb';



export const metadata: Metadata = {
    title: 'ShopLayout Title',
    description: 'ShopLayout Description'
};

export default async function ShopLayout({ children }: {
    children: React.ReactNode
}) {

    const resp = await verifyJWT();

    if (resp.ok) {
        redirect('/');
    }



    return (
        <>

            <main className='flex flex-row justify-center  min-h-screen w-full '>
                <div className='relative my-5'>

                    <div className="text-center mb-8">
                        <IoFilmOutline className="w-12 h-12 mx-auto text-teal-600" />
                        <h1 className="text-3xl font-bold text-gray-800 mt-2">CineClick</h1>
                        <p className="text-gray-600">Tu portal de películas favorito</p>
                    </div>
                    <div className='w-[450px]  pt-2 px-10 border rounded-md bg-white'>
                        {children}
                    </div>
                </div>
            </main>
            <footer className="bg-gray-800 text-gray-300 py-6 mt-auto">
                <div className="max-w-4xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm">
                            © {new Date().getFullYear()} Cinema Tickets. Todos los derechos reservados.
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <TbMailBitcoin className="w-4 h-4" />
                            <a
                                href="mailto:Nachotizii988@gmail.com"
                                className="hover:text-teal-400 transition-colors"
                            >
                                Nachotizii988@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
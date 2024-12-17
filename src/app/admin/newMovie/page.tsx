import type { Metadata } from 'next'
import { MovieForm } from './ui/MovieForm';


export const metadata: Metadata = {
    title: 'Add new movie Title',
    description: 'Add new movie Description'
};

export default function AddNewMovie() {
    return (
        <div className=' w-full pl-2  '>
            <h1 className='text-4xl'>Configuración de peliculas</h1>
            <div className='sm:hidden block'>

                <MovieForm isMobile={true} />
            </div>
            <div className='sm:block hidden'>

                <MovieForm isMobile={false} />
            </div>
        </div>
    );
};
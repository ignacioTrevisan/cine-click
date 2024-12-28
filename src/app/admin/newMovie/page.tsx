import type { Metadata } from 'next'
import { MovieForm } from './ui/MovieForm';
import { GetTags } from '@/app/core/use-cases/tags/getTags';


export const metadata: Metadata = {
    title: 'Add new movie Title',
    description: 'Add new movie Description'
};

export default async function AddNewMovie() {
    const tags = await GetTags();
    return (
        <div className=' w-full pl-2  '>
            <h1 className='text-2xl sm:text-4xl ml-10'>Configuración de peliculas</h1>
            <div className='sm:hidden block'>

                <MovieForm isMobile={true} tagsEnum={tags.tags} />
            </div>
            <div className='sm:block hidden'>

                <MovieForm isMobile={false} tagsEnum={tags.tags} />
            </div>
        </div>
    );
};
import type { Metadata } from 'next'
import { Table } from './ui/table';
import { GetAllMovies } from '@/app/core/use-cases/movies/getMovies';
import { GetAllTheathers } from '@/app/core/use-cases/thether/getAllTheathers';
import { GetAllTransmition } from '@/app/core/use-cases/billboard/getAllTransmition';


export const metadata: Metadata = {
    title: 'Billboard Title',
    description: 'Billboard Description'
};

export default async function Billboard() {
    const allMovies = await GetAllMovies();
    const allTheathers = await GetAllTheathers();
    const allBillboard = await GetAllTransmition();
    if (!allMovies.ok || !allTheathers.ok || !allBillboard.ok) {
        return <div>Error</div>
    }

    return (
        <div className=' w-full pl-2 '>
            <h1 className='text-2xl sm:text-4xl ml-10'>Peliculas a proyectar</h1>
            <div className='sm:hidden block'>

                <Table isMobile={true} movie={allMovies.data!} theathers={allTheathers.data as { id: string, capacity: number, name: string }[]} billboard={allBillboard!.data!} />
            </div>
            <div className='sm:block hidden'>

                <Table isMobile={false} movie={allMovies.data!} theathers={allTheathers.data as { id: string, capacity: number, name: string }[]} billboard={allBillboard!.data!} />
            </div>

        </div>
    );
};
import type { Metadata } from 'next'
import { Table } from './ui/table';
import { GetAllMovies } from '@/app/core/use-cases/movies/getMovies';
import { GetAllTheathers } from '@/app/core/use-cases/thether/getAllTheathers';


export const metadata: Metadata = {
    title: 'Billboard Title',
    description: 'Billboard Description'
};

export default async function Billboard() {
    const allMovies = await GetAllMovies();
    const allTheathers = await GetAllTheathers();

    if (!allMovies.ok || !allTheathers.ok) {
        return <div>Error</div>
    }

    const movieExample = [
        { id: 1, movie: "Batman" },
        { id: 2, movie: "Barbie" },
    ]
    const tableData = [
        { id: 1, salon: "1", movie: "Batman", price: 100, tags: "Acción" },
        { id: 2, salon: "2", movie: "Barbie", price: 120, tags: "Comedia" },
        { id: 3, salon: "3", movie: "Oppenheimer", price: 150, tags: "Drama" },
        { id: 4, salon: "4", movie: "Dune", price: 130, tags: "Ciencia Ficción" },
        { id: 5, salon: "2", movie: "Frozen", price: 90, tags: "Animada" },
    ];

    return (
        <div className=' w-full pl-2  '>
            <h1 className='text-2xl sm:text-4xl ml-10'>Peliculas a proyectar</h1>
            <div className='sm:hidden block'>

                <Table isMobile={true} movie={allMovies.data!} theathers={allTheathers.data as { id: string, capacity: number, name: string }[]} />
            </div>
            <div className='sm:block hidden'>

                <Table isMobile={false} movie={allMovies.data!} theathers={allTheathers.data as { id: string, capacity: number, name: string }[]} />
            </div>

        </div>
    );
};
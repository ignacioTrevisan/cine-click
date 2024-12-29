import type { Metadata } from 'next'
import { Table } from './ui/table';
import { GetAllMovies } from '@/app/core/use-cases/movies/getMovies';
import { GetAllBillboardConfig } from '@/app/core/use-cases/billboardConfig/getAllBillboardConfig';


export const metadata: Metadata = {
    title: 'template Title',
    description: 'template Description'
};

export default async function BillboardConfigPage() {
    const allMovies = await GetAllMovies();
    const billboardConfig = await GetAllBillboardConfig();
    if (!allMovies.ok || !billboardConfig.ok) return;

    return (
        <div className='w-full min-h-screen'>
            <h1 className='ml-10 mt-2 text-3xl'>Configuración de cartelera</h1>

            <div className='sm:hidden block'>

                <Table isMobile={true} movie={allMovies.data!} billboardConfig={billboardConfig.data!} />
            </div>
            <div className='sm:block hidden'>

                <Table isMobile={false} movie={allMovies.data!} billboardConfig={billboardConfig.data!} />
            </div>

        </div>
    );
};
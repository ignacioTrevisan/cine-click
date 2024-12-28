import type { Metadata } from 'next'
import { Table } from './ui/table';


export const metadata: Metadata = {
    title: 'template Title',
    description: 'template Description'
};

export default function BillboardConfigPage() {
    return (
        <div className='w-full min-h-screen'>
            <h1 className='ml-10 mt-2 text-3xl'>Configuración de cartelera</h1>

            <div className='sm:hidden block'>

                <Table isMobile={true} />
            </div>
            <div className='sm:block hidden'>

                <Table isMobile={false} />
            </div>

        </div>
    );
};
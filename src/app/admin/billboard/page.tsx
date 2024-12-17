import type { Metadata } from 'next'
import { Table } from './ui/table';


export const metadata: Metadata = {
    title: 'Billboard Title',
    description: 'Billboard Description'
};

export default function Billboard() {
    const tableData = [
        { id: 1, salon: "1", movie: "Batman", price: 100, tags: "Acción" },
        { id: 2, salon: "2", movie: "Barbie", price: 120, tags: "Comedia" },
        { id: 3, salon: "3", movie: "Oppenheimer", price: 150, tags: "Drama" },
        { id: 4, salon: "4", movie: "Dune", price: 130, tags: "Ciencia Ficción" },
        { id: 5, salon: "2", movie: "Frozen", price: 90, tags: "Animada" },
    ];

    return (
        <div className=' w-full pl-2  '>
            <h1 className='text-4xl'>Peliculas a proyectar</h1>
            <Table />
        </div>
    );
};
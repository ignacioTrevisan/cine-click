import type { Metadata } from 'next'
import { MostImportantReleasesCard } from './ui/mostImportantReleasesCard';
import { Navbar } from '../components/navbar';
import { ThisWeekCard } from './ui/ThisWeekCard';


export const metadata: Metadata = {
    title: 'Home page',
    description: 'Home Description'
};

export default function Home() {
    const MoviesSoon = [
        { name: "Nosferatu", path: "/images/Nosferatu.jpg", slug: 'slug_test_Nosferatu' },
        { name: "Megalopolis", path: "/images/Megalopolis.jpg", slug: 'slug_test_Megalopolis' },
        { name: "miVillanoFavorito", path: "/images/miVillanoFavorito.jpg", slug: 'slug_test_miVillanoFavorito' },
        { name: "vivirElMomento", path: "/images/vivirElMomento.jpg", slug: 'vivirElMomento' },
        { name: "kraven", path: "/images/kraven.jpg", slug: 'kraven' },

    ];
    const MoviesThisWeek = [
        { name: "bagman", path: "/images/bagman3.jpg", slug: 'slug_test_bagman' },
        { name: "noTeSueltes", path: "/images/noTeSueltes2.jpg", slug: 'slug_test_noTeSueltes' },
        { name: "todosLosNombresDeDios", path: "/images/todosLosNombresDeDios2.jpg", slug: 'slug_test_todosLosNombresDeDios' },
        { name: "panda", path: "/images/panda.jpg", slug: 'slug_test_panda' },
        { name: "transformer", path: "/images/transformer.jpg", slug: 'slug_test_transformer' },
    ];
    return (
        <div className='w-full row'>
            <div className='h-[50px]' />
            <MostImportantReleasesCard />
            <div className='h-[10px]' />
            <ThisWeekCard title={'Ésta semana'} Movies={MoviesThisWeek} />
            <ThisWeekCard title={'Próximamente'} Movies={MoviesSoon} delay={2600} />
        </div>
    );
};
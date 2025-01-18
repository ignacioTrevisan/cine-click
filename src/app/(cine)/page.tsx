import type { Metadata } from 'next'
import { MostImportantReleasesCard } from './ui/mostImportantReleasesCard';
import { ThisWeekCard } from './ui/ThisWeekCard';
import { GetAllBillboardConfig } from '../core/use-cases/billboardConfig/getAllBillboardConfig';
import { GetAllMovies } from '../core/use-cases/movies/getMovies';
import { GetAllTransmition } from '../core/use-cases/billboard/getAllTransmition';


export const metadata: Metadata = {
    title: 'Home page',
    description: 'Home Description'
};

export default async function Home() {
    const movieConfig = await GetAllBillboardConfig();
    const allMovies = await GetAllMovies();
    const allBillboard = await GetAllTransmition();

    if (!movieConfig || !allMovies || !allBillboard) {
        return <div>Error</div>
    }
    if (!movieConfig.ok || !allMovies.ok || !allBillboard.ok) {
        return <div>Error</div>
    }
    const today = new Date();
    const currentDay = today.getDay();

    // Calcular el desplazamiento para que la semana empiece el lunes
    const daysFromMonday = currentDay === 0 ? -6 : 1 - currentDay; // Si es domingo (0), comenzamos desde el lunes (-6)

    // Array para almacenar las fechas de esta semana desde lunes a domingo
    const weekDates: string[] = [];

    // Iterar desde el lunes (0) hasta el domingo (6)
    for (let i = 0; i < 7; i++) {
        // Crear una nueva fecha ajustada al día deseado
        const date = new Date(today);
        date.setDate(today.getDate() + daysFromMonday + i); // Ajustar la fecha al día correspondiente

        // Formatear la fecha completa (día/mes/año)
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        weekDates.push(formattedDate); // Agregar la fecha completa al array
    }



    if (!allMovies || !allMovies.data) return;

    const MoviesSoon = allMovies.data.filter((a) =>
        movieConfig.data!.soon.some((s) => s.movieId === a.id)
    ).map((m) => ({
        name: m.title,
        path: m.PrincipalImage[0].Url,
        slug: m.slug,
    }))
    const MostImportantReleases = allMovies.data.filter((a) =>
        movieConfig.data!.newRelease.some((s) => s.movieId === a.id)
    ).map((m) => ({
        name: m.title,
        path: m.PrincipalImage[0].Url,
        slug: m.slug,
    }));

    const week: {
        name: string;
        path: string;
        slug: string;
    }[] = [];
    allBillboard.data!.map((b) => {
        const billboardDate = new Date(b.date);
        const formattedDate = `${billboardDate.getDate()}/${billboardDate.getMonth() + 1}/${billboardDate.getFullYear()}`;
        const config = weekDates.find((date) => date === formattedDate);
        if (config) {
            const verifyExist = week.find((w) => w.slug === b.movie.slug);
            if (!verifyExist) {

                week.push({
                    name: b.movie.title,
                    path: allMovies.data?.find((m) => m.id === b.movieId)?.PrincipalImage[0].Url || '',
                    slug: b.movie.slug,
                });
            }
        }
    });


    return (
        <div className='w-full row'>
            <div className='h-[50px]' />
            <MostImportantReleasesCard Movies={MostImportantReleases} />
            <div className='h-[10px]' />
            <ThisWeekCard title={'Ésta semana'} Movies={week} />
            <ThisWeekCard title={'Próximamente'} Movies={MoviesSoon} delay={2600} />
        </div>
    );
};
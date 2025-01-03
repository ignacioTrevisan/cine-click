import type { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'

import { ImagesSlider } from './ui/imagesSlider';
import { DayAvailable } from './ui/dayAvailable';
import { GetMovieBySlug } from '@/app/core/use-cases/movies/getMovieBySlug';
import { CalendarElement } from './ui/calendar';
import { GetTransmitionById } from '@/app/core/use-cases/billboard/getTransmitionById';



interface Props {
    params: Promise<{
        slug: string
    }>
}
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const slug = (await params).slug

    return {
        title: slug,
        description: `${slug} description`,
        openGraph: {
            title: slug,
            description: slug ?? '',

        },
    }
}
export default async function template({ params }: Props) {
    const slug = (await params).slug
    const movie = await GetMovieBySlug(slug);
    const transmitions = await GetTransmitionById(movie.data?.id!);
    if (!movie) return;
    const imagesReleases = { name: movie.data!.title, path: movie.data!.PrincipalImage[0].Url }
    const imagesSecondary: { name: string, path: string }[] = [];
    movie.data?.Images.map((img, index) => {
        imagesSecondary.push({ name: `${movie.data?.title}-${index}`, path: img.Url.trimEnd() })
    });


    const transmitionFormatted = transmitions.data?.map((t) => ({
        start: new Date(+t.date.toString().split('-')[0], +t.date.toString().split('-')[1] - 1, +t.date.toString().split('-')[2].split('T')[0], +t.time.split(':')[0], +t.time.split(':')[1]),
        end: new Date(+t.date.toString().split('-')[0], +t.date.toString().split('-')[1] - 1, +t.date.toString().split('-')[2].split('T')[0], +t.time.split(':')[0] + 3, +t.time.split(':')[1]),
        title: 'Comprar',
        id: t.id
    })).filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.start.getTime() === value.start.getTime() && t.end.getTime() === value.end.getTime()
        ))
    );

    return (
        <div className='sm:p-10 p-2'>
            <div className='pt-10'>
                {/* Imagen principal */}
                <div className='w-full'>
                    <Image src={imagesReleases.path}
                        width={1920}
                        height={1080}
                        alt={imagesReleases.name}
                        className={`object-contain filter transition-all h-[400px] w-full`}
                    />
                </div>
                {/* Imagenes secundarias */}




                <ImagesSlider images={imagesSecondary} />


                <div className='flex w-full mt-5 justify-center'>

                    <h1 className='text-xl'>{movie.data?.title}</h1>
                </div>
                <div className='mt-2'>
                    <p>{movie.data?.description}</p>
                </div>
                <h3 className='text-xl mt-5'>Días de Proyección</h3>

                <CalendarElement movieTransmitionFormatted={transmitionFormatted!} movieTransmitions={transmitions.data!} />
            </div>
        </div >
    );
};
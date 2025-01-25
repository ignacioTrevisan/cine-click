import type { Metadata } from 'next'
import Image from 'next/image'

import { ImagesSlider } from './ui/imagesSlider';
import { GetMovieBySlug } from '@/app/core/use-cases/movies/getMovieBySlug';
import { GetTransmitionById } from '@/app/core/use-cases/billboard/getTransmitionById';
import { GetAllSlugs } from '@/app/core/use-cases/movies/getAllSlugs';
import { CalendarClient } from './ui/calendarClient';
import { Footer } from '@/app/components/footer';



interface Props {
    params: Promise<{
        slug: string
    }>
}



export async function generateStaticParams() {
    const resp = await GetAllSlugs();
    if (!resp) {
        return []
    };
    return resp.map(r => ({
        slug: r.slug
    }))
}

export const revalidate = 600;


export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
    if (!movie.data?.id || !movie) return;
    const transmitions = await GetTransmitionById(movie.data?.id);


    const imagesReleases = { name: movie.data!.title, path: movie.data!.PrincipalImage[0].Url }
    const imagesSecondary: { name: string, path: string }[] = [];
    movie.data?.Images.map((img, index) => {
        imagesSecondary.push({ name: `${movie.data?.title}-${index}`, path: img.Url.trimEnd() })
    });




    return (
        <>

            <div className='sm:p-10 p-2 w-full flex justify-center'>
                <div className='pt-10 w-[80%] '>
                    {/* Imagen principal */}

                    {/* v desktop */}
                    <div className='w-full hidden md:block'>
                        <Image src={imagesReleases.path}
                            width={1920}
                            height={1080}
                            alt={imagesReleases.name}
                            className={`object-fit filter transition-all h-[600px] w-full rounded-xl`}
                        />
                    </div>

                    {/* v tablet */}

                    <div className='w-full hidden sm:block md:hidden mt-10'>
                        <Image src={imagesReleases.path}
                            width={1920}
                            height={1080}
                            alt={imagesReleases.name}
                            className={`object-fit filter transition-all h-[300px] w-full rounded-xl`}
                        />
                    </div>

                    {/* v mobile */}

                    <div className='w-full block sm:hidden mt-10'>
                        <Image src={imagesReleases.path}
                            width={1920}
                            height={1080}
                            alt={imagesReleases.name}
                            className={`object-fit filter transition-all h-[200px] w-full rounded-xl`}
                        />
                    </div>
                    {/* Imagenes secundarias */}




                    <ImagesSlider images={imagesSecondary} />


                    <div className='flex w-full mt-5 justify-center'>

                        <h1 className=' text-md font-bold text-teal-600 sm:text-4xl'>{movie.data?.title}</h1>
                    </div>
                    <div className='mt-2'>
                        <p>{movie.data?.description}</p>
                    </div>

                    <h3 className='text-xl mt-5'>Días de Proyección</h3>

                    <CalendarClient movieTransmitions={transmitions.data?.normal} movieTransmitionFormatted={transmitions.data?.formatted} />
                </div>
            </div >
            <Footer />

        </>
    );
};
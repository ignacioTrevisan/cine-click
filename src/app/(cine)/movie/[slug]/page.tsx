import type { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'

import { ImagesSlider } from './ui/imagesSlider';
import { DayAvailable } from './ui/dayAvailable';



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
    const imagesReleases = { name: "Venom", path: "/images/Venom.jpg" }
    const imagesSecondary = [
        { name: "Venom1", path: "/images/particulares/1.jpg" },
        { name: "Venom2", path: "/images/particulares/2.jpg" },
        { name: "Venom3", path: "/images/particulares/3.jpg" },
        { name: "Venom4", path: "/images/particulares/4.jpg" },
        { name: "Venom5", path: "/images/particulares/5.jpg" },
    ]
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

                    <h1 className='text-xl'>Venom: El último baile (2024)</h1>
                </div>
                <div className='mt-2'>
                    <p>Eddie y Venom están a la fuga. Perseguidos por sus sendos mundos y cada vez más cercados, el dúo se ve abocado a tomar una decisión devastadora que hará que caiga el telón sobre el último baile de Venom y Eddie.</p>
                </div>
                <h3 className='text-xl mt-5'>Días de Proyección</h3>

                <DayAvailable />
            </div>
        </div >
    );
};
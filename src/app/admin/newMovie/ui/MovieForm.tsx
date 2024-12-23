"use client"

import { AddMovie } from "@/app/core/use-cases/movies/addMovie";
import { SideBarStore } from "@/app/store/sideBarStore";
import { useForm } from "react-hook-form";

interface FormInput {
    title: string,
    description: string,
    price: number,
    PrincipalImage: File;
    images?: File[];
    tags: string,
    adult: boolean,
    dates: Date[]
}
interface Props {
    isMobile?: boolean
}
export const MovieForm = ({ isMobile = false }: Props) => {
    const { handleSubmit, register, formState: { isValid }, getValues, setValue, watch } =
        useForm<FormInput>({
            // defaultValues:
            // {
            //     ...product,
            //     tags: product.tags?.join(','),
            //     description: product.description!,
            //     sizes: product.sizes ?? [],
            //     images: undefined
            // }
        })
    const onSubmit = async (data: FormInput) => {
        console.log('hola')
        console.log({ data })

        const title = data.title;
        const description = data.description;
        const durationMin = 120; // Replace with actual duration logic
        const tags = ['Acción', 'Comedia']
        const PrincipalImage = 'url';
        const Images = ['url2', 'url3']


        const { ok } = await AddMovie({
            title,
            description,
            durationMin,
            tags,
            PrincipalImage,
            Images
        });
        if (ok) {
            alert('Pelicula creada con exito')
        } else {
            alert('Ocurrio un error al intentar subir la pelicula, por favor vuelva a intentarlo más tarde')
        }
    }
    // const handleDelete = async (id: string, url: string) => {
    //     const resp = await DeleteProductImages(id, url);
    //     console.log(resp)
    // }
    const { closeSideBar } = SideBarStore()
    return (
        <form className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3 mr-5" onSubmit={handleSubmit(onSubmit)}
            onClick={() => isMobile && closeSideBar()}>
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200"  {...register('title', { required: true })} />
                </div>


                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200"

                        {...register('description', { required: true })}
                    />
                </div>






                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200"
                        {...register('tags', { required: true })}
                    />
                </div>



                <div className="flex flex-col mb-2">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            {...register('adult')}
                            className="mr-2"
                        />
                        ¿Es contenido para adultos?
                    </label>
                </div>

                <button className="btn-primary w-full" type="submit">
                    Guardar
                </button>

            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Imagen de cartelera</span>
                    <input
                        type="file"

                        {...register('PrincipalImage', { required: true, min: 0 })}
                        className="p-2 border rounded-md bg-gray-200"
                        accept="image/png, image/jpeg, image/avif"
                    />


                </div>
                <div className="flex flex-col mb-2">
                    <span>Imagenes</span>
                    <input
                        type="file"
                        multiple
                        {...register('images')}
                        className="p-2 border rounded-md bg-gray-200"
                        accept="image/png, image/jpeg, image/avif"
                    />


                </div>
            </div>
        </form>
    )
}

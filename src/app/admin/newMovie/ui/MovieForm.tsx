"use client"

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
        console.log({ data })
        //     const form = new FormData();
        //     const { images, ...productValue } = data;
        //     if (product.id) {

        //         form.append('id', product.id ?? '')
        //     }
        //     if (images) {
        //         for (let i = 0; i < images.length; i++) {
        //             form.append('images', images[i])
        //         }
        //     }
        //     form.append('title', productValue.title)
        //     form.append('tags', productValue.tags)
        //     form.append('description', productValue.description)
        //     form.append('gender', productValue.gender)
        //     form.append('inStock', productValue.inStock.toString())
        //     form.append('price', productValue.price.toString())
        //     form.append('slug', productValue.slug)
        //     form.append('categoryId', productValue.categoryId)
        //     form.append('sizes', productValue.sizes.toString())
        //     const { ok, product: newProduct } = await AddUpdateProducts(form);
        //     if (ok) {
        //         router.replace(`/admin/products/${newProduct!.slug}`)
        //     }
        // }

        // const handleDelete = async (id: string, url: string) => {
        //     const resp = await DeleteProductImages(id, url);
        //     console.log(resp)
    }
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

                <button className="btn-primary w-full">
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

"use client"

import { AddMovie } from "@/app/core/use-cases/movies/addMovie";
import { UploadImagesToCloudinary } from "@/app/helpers/uploadImagesToCloudinary";
import { SideBarStore } from "@/app/store/sideBarStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from 'sonner'



interface FormInput {
    title: string,
    description: string,
    price: number,
    PrincipalImage: FileList;
    durationMin: number,
    images?: FileList;
    tags: string,
    adult: boolean,
    dates: Date[]
}
interface Props {
    isMobile?: boolean
    tagsEnum: string[]
}
export const MovieForm = ({ isMobile = false, tagsEnum }: Props) => {
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
    const [previewPrincipal, setPreviewPrincipal] = useState<string | null>(null);
    const [adultState, setAdultState] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newPreviews: string[] = [];
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = () => {
                    newPreviews.push(reader.result as string);

                    setPreviews((prev) => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };


    const handlePrincipalImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Verifica si hay un archivo seleccionado
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewPrincipal(reader.result as string); // Actualiza la vista previa con el contenido del archivo
            };
            reader.readAsDataURL(file); // Lee el archivo como una URL base64
        }
    };

    const [isLoading, setisLoading] = useState(false)
    const onSubmit = async (data: FormInput) => {
        if (!data.images || !data.PrincipalImage) {
            console.error("Images or PrincipalImage is null or undefined");
            return;
        }
        setisLoading(true)
        const Images = await UploadImagesToCloudinary({ images: Array.from(data.images) });
        const PrincipalImage = await UploadImagesToCloudinary({ images: Array.from(data.PrincipalImage) });

        if (!Images || !PrincipalImage) {
            console.error("UploadImagesToCloudinary returned null or undefined");
            return;
        }

        const title = data.title;
        const description = data.description;
        const durationMin = data.durationMin;
        const tagsMovie = tags
        const isAdult = adultState;
        const { ok } = await AddMovie({
            title,
            description,
            durationMin,
            tags: tagsMovie, //TODO: Hay que validar los tags
            PrincipalImage: PrincipalImage[0],
            Images: Images.filter((image): image is string => image !== null),
            isAdult,
        });
        if (ok) {

            toast('🎞️ㅤㅤㅤㅤ¡Pelicula creada con exito!', { style: { background: '#E5E7EB', color: '#333', fontSize: '16px', padding: '15px' } })
        } else {
            alert('Ocurrio un error al intentar subir la pelicula, por favor vuelva a intentarlo más tarde')
        }
        setisLoading(false);
    }



    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [tags, setTags] = useState<string[]>([]);


    const filteredOptions = tagsEnum.filter(option =>
        option.toLowerCase().includes(search.toLowerCase())
    );

    const handleOptionClick = (option: string) => {
        if (tags.includes(option)) return;
        if (tags.length > 2) return;
        setSearch(option);
        setIsOpen(false);
        setTags([...tags, option]);
    };
    const deleteTag = (option: string) => {
        const newTag = tags.filter((tag) => tag !== option);
        setTags(newTag);
    }


    // const handleDelete = async (id: string, url: string) => {
    //     const resp = await DeleteProductImages(id, url);
    //     console.log(resp)
    // }
    const { closeSideBar } = SideBarStore()

    return (
        <form className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3 mr-5" onSubmit={handleSubmit(onSubmit)}
            onClick={() => isMobile && closeSideBar()}>



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





                <span>Tags</span>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={() => setIsOpen(!isOpen)}
                    placeholder="Buscar..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {isOpen && (
                    <ul className="relative z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleOptionClick(option)}
                                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                                >
                                    {option}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-500">No hay resultados</li>
                        )}
                    </ul>
                )}
                {tags.length > 0 &&
                    <div className="flex flex-col mt-2 h-10">

                        <div
                            className=" border rounded-md bg-gray-200  flex items-center h-10"
                        >
                            {tags.map((tag, i) => (
                                <button className="bg-white rounded-xl border p-1" key={i}
                                    onClick={() => deleteTag(tag)}
                                >{tag}</button>

                            ))}
                        </div>


                    </div>
                }



                <div className="flex flex-col mb-2">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            {...register('adult')}
                            className="mr-2"
                            onChange={(e) => setAdultState(e.target.checked)}
                        />
                        ¿Es contenido para adultos?
                    </label>
                </div>

                <button className={`btn ${isLoading ? 'btn-disabled cursor-no-drop' : 'btn-primary cursor-pointer'} w-full`} type="submit">
                    Guardar
                </button>

            </div>



            <div className="w-full">

                <span>Tags</span>
                <input
                    type="number"
                    step="10"
                    min="0"
                    max={180}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    {...register('durationMin', { required: true, min: 0 })}
                    placeholder="Duración en minutos"
                />
                {/* Imagenes */}

                <div className="flex flex-col mb-2">
                    <span>Imagen de cartelera</span>
                    <input
                        type="file"
                        {...register('PrincipalImage', { onChange: handlePrincipalImageChange, required: true, min: 0 })}
                        className="p-2 border rounded-md bg-gray-200"
                        accept="image/png, image/jpeg, image/avif"
                    />

                    {previewPrincipal && (
                        <Image
                            src={previewPrincipal}
                            alt="Vista previa"
                            style={{ marginTop: '10px', maxWidth: '100px', borderRadius: '8px' }}
                            width={200}
                            height={200}
                        />
                    )}

                </div>
                <div className="flex flex-col mb-2">
                    <span>Imagenes</span>
                    <input
                        type="file"
                        multiple
                        {...register('images', { onChange: handleImageChange })}
                        className="p-2 border rounded-md bg-gray-200"
                        accept="image/png, image/jpeg, image/avif"
                    />
                    <div className="flex gap-3 w-full">

                        {previews && (
                            previews.map((preview, i) => (
                                <Image
                                    key={i}
                                    src={preview}
                                    alt="Vista previa"
                                    style={{ marginTop: '10px', maxWidth: '100px', borderRadius: '8px' }}
                                    width={200}
                                    height={200}
                                />
                            ))

                        )}
                    </div>

                </div>
            </div>
        </form>
    )
}

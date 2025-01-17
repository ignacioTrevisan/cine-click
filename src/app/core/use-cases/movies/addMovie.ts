'use server'
import { revalidatePath } from "next/cache";

interface Props {
    title: string;
    description: string;
    durationMin: number;
    tags: string[];
    PrincipalImage: string | null;
    Images: string[] | null;
    isAdult: boolean;
    slug: string
}
export const AddMovie = async ({ title, description, durationMin, tags, PrincipalImage, Images, isAdult, slug }: Props) => {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, durationMin, tags, PrincipalImage, Images, isAdult, slug }),
        });

        const data = await resp.json();
        revalidatePath('/admin/billboard')
        return {
            ok: true,
            data
        };
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            msg: 'Ocurrio un error al intentar subir la pelicula, por favor vuelva a intentarlo más tarde'
        }
    }
}
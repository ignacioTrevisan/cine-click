'use server'

import { ApiResponse } from "@/app/infraestructure/interfaces/api-response";
import { Movie } from "@/app/infraestructure/interfaces/movies-response";



export const GetMovieBySlug = async (slug: string): Promise<ApiResponse<Movie>> => {
    try {
        console.log(`url: ${process.env.NEXT_PUBLIC_API_URL}/api/movies?slug=${slug}`)
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies?slug=${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const respD = await resp.json();
        return respD;
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            msg: 'Ocurrio un error al intentar subir la pelicula, por favor vuelva a intentarlo más tarde'
        }
    }
}

import { ApiResponse } from "@/app/infraestructure/interfaces/api-response";
import { GetAllMoviesResponse, Movie } from "@/app/infraestructure/interfaces/movies-response";

export const GetAllMovies = async (): Promise<ApiResponse<Movie[]>> => {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const respD = await resp.json() as GetAllMoviesResponse;
        if (!respD.ok) {
            return {
                ok: false,
                msg: 'Ocurrio un error al intentar subir la pelicula, por favor vuelva a intentarlo más tarde'
            }
        }

        return {
            ok: true,
            data: respD.movies
        };
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            msg: 'Ocurrio un error al intentar subir la pelicula, por favor vuelva a intentarlo más tarde'
        }
    }
}
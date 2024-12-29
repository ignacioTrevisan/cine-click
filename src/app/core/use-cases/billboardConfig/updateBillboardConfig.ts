'use server'
import { ApiResponse } from "@/app/infraestructure/interfaces/api-response";
import { revalidatePath } from "next/cache";

interface Props {
    id: string,
    mode: 'NewRelease' | 'soon'
}
export const UpdateBillboardConfig = async ({ id, mode }: Props): Promise<ApiResponse> => {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/billboardConfig`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idMovie: id, mode }),
        })

        const data = await resp.json();

        revalidatePath('/admin/billboard')
        revalidatePath('/')
        return {
            ok: true
        }
    } catch (error) {
        console.log(error)
        throw Error(`Error al intentar subir la transmision ${error}`)
    }
}

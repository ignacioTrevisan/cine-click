'use server'

import { ApiResponse } from "@/app/infraestructure/interfaces/api-response";
import { BillboardConfigResponse } from "@/app/infraestructure/interfaces/billboardConfig-response";

export const GetAllBillboardConfig = async (): Promise<ApiResponse<BillboardConfigResponse>> => {
    try {

        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/billboardConfig`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const respD = await resp.json() as ApiResponse<BillboardConfigResponse>
        return {
            ok: true,
            data: respD.data
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            msg: 'Ocurrio un error al intentar traer la configuracion de cartelera, por favor vuelva a intentarlo más tarde. '
        }
    }
}

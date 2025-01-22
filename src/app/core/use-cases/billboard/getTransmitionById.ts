import { Datum } from '@/app/infraestructure/interfaces/billboard-response';
import { ApiResponse } from '../../../infraestructure/interfaces/api-response';

export const GetTransmitionById = async (id: string) => {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/billboard?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        // Promise<NextResponse<{ ok: boolean, msg: string }>>
        const data = await resp.json() as ApiResponse<Datum[]>;

        const transmitionFormatted = data.data?.map((t) => ({
            start: new Date(+t.date.toString().split('-')[0], +t.date.toString().split('-')[1] - 1, +t.date.toString().split('-')[2].split('T')[0], +t.time.split(':')[0], +t.time.split(':')[1]),
            end: new Date(+t.date.toString().split('-')[0], +t.date.toString().split('-')[1] - 1, +t.date.toString().split('-')[2].split('T')[0], +t.time.split(':')[0] + 3, +t.time.split(':')[1]),
            title: 'Comprar',
            id: t.id
        })).filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.start.getTime() === value.start.getTime() && t.end.getTime() === value.end.getTime()
            ))
        );
        return {
            ok: true,
            data: { normal: data.data, formatted: transmitionFormatted }
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false
        }
    }
}

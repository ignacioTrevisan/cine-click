import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const cookies = request.headers.get('cookie');
        const token = cookies?.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

        if (!token) {
            return NextResponse.json({ ok: false, msg: 'Token no proporcionado' }, { status: 401 });
        }
        return NextResponse.json({ ok: true, msg: 'Token proporcionado' }, { status: 200 });
    } catch (error) {
        throw new Error(`${error}`);
    }
}
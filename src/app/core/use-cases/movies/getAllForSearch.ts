'use server'

import prisma from "@/lib/prisma"

export const GetAllForSearch = async () => {
    try {
        const resp = await prisma.movie.findMany({ select: { title: true, slug: true } })
        return resp;
    } catch (error) {
        console.log(error);
        return []
    }
}

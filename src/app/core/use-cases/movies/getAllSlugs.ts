'use server'

import prisma from "@/lib/prisma"

export const GetAllSlugs = async () => {
    try {
        const resp = await prisma.movie.findMany({ select: { slug: true } })
        return resp;
    } catch (error) {
        console.log(error)
    }
}

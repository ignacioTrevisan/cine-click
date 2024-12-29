export const GetTags = async (): Promise<{ ok: boolean, tags: string[] }> => {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tags`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        });
        console.log('getting tags')
        const data = await resp.json() as { ok: boolean, tags: string[] };
        return data;
    } catch (error) {
        throw new Error('Ocurrio un error al intentar obtener los tags, por favor vuelva a intentarlo más tarde')
    }
}
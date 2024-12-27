'use server'
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: 'nachotrevisan',
    api_key: process.env.API_KEY_CLOUDINARY, // Click 'View API Keys' above to copy your API key
    api_secret: process.env.API_SECRET_CLOUDINARY // Click 'View API Keys' above to copy your API secret
});
interface Props {
    images: File[]
}
export const UploadImagesToCloudinary = async ({ images }: Props) => {
    try {
        const uploadPromises = images.map(async (image) => {
            try {
                const buffer = await image.arrayBuffer()
                const base64Image = Buffer.from(buffer).toString('base64');
                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, { folder: 'cine-click' }).then((r) => r.secure_url);
            } catch (error) {
                console.log(error)
                return null
            }
        })
        const resp = await Promise.all(uploadPromises);
        return resp;
    } catch (error) {
        console.log(error);
        throw Error('Ocurrio un error al intentar subir las imagenes, por favor, vuelva a intentarlo más tarde')
    }

}

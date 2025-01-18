'use server'
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: 'nachotrevisan',
    api_key: process.env.API_KEY_CLOUDINARY, // Click 'View API Keys' above to copy your API key
    api_secret: process.env.API_SECRET_CLOUDINARY // Click 'View API Keys' above to copy your API secret
});
interface Props {
    images: File[],
    isPrincipalImage?: boolean
}
export const UploadImagesToCloudinary = async ({ images, isPrincipalImage }: Props) => {
    try {
        const uploadPromises = images.map(async (image) => {
            try {
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');

                // Configura las opciones según si es la imagen principal o no
                const options = {
                    folder: 'cine-click',
                    ...(isPrincipalImage && {
                        width: 1920,
                        height: 1080,
                        crop: 'pad', // Añade bordes para ajustar la imagen a la resolución exacta
                        background: 'auto', // Ajusta el color de fondo (auto selecciona un color apropiado)
                        fetch_format: 'auto',
                        quality: 'auto',
                    }),
                };

                // Sube la imagen a Cloudinary
                return cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, options)
                    .then((r) => r.secure_url);
            } catch (error) {
                console.error('Error subiendo la imagen:', error);
                return null;
            }
        });

        const resp = await Promise.all(uploadPromises);
        return resp;
    } catch (error) {
        console.log(error);
        throw Error('Ocurrio un error al intentar subir las imagenes, por favor, vuelva a intentarlo más tarde')
    }
}

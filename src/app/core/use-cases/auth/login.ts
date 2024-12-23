

interface Props {
    email: string,
    password: string
}
export const Login = async ({ email, password }: Props) => {
    try {

        const bodyForFetch = {
            email, password
        };

        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: 'POST', // Asegúrate de especificar el método
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyForFetch), // Convierte el objeto a JSON
            credentials: 'include'
        });

        const data = await resp.json(); // Procesa la respuesta si es necesario
        return data;
    } catch (error) {
        console.log(error)
    }
}


interface Props {
    email: string,
    Password: string
}
export const Login = async ({ email, Password }: Props) => {
    try {

        const bodyForFetch = {
            email, Password
        };
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: 'POST', // Asegúrate de especificar el método
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyForFetch), // Convierte el objeto a JSON
            credentials: 'include'
        });
        console.log(resp)
        const data = await resp.json(); // Procesa la respuesta si es necesario
        return data;
    } catch (error) {
        console.log(error)
    }
}
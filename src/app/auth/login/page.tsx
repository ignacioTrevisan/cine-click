import type { Metadata } from 'next'
import { LoginForm } from './ui/LoginForm';

export const metadata: Metadata = {
    title: 'Login page',
    description: 'Login Description'
};

export default async function Login() {

    return (
        <div className="flex flex-col  items-center justify-center animate__animated animate__fadeIn h-[450px]">

            <h1 className={`text-4xl mb-5`}>Ingresar</h1>

            <LoginForm />
        </div>
    );
};
import type { Metadata } from 'next'
import { LoginForm } from './ui/LoginForm';
import { cookies } from 'next/headers'
import { verifyJWT } from '@/app/core/use-cases/auth/verifyJWT';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export const metadata: Metadata = {
    title: 'Login page',
    description: 'Login Description'
};

export default async function Login() {

    return (
        <div className="flex flex-col min-h-screen pt-32 sm:pt-52 ">

            <h1 className={`text-4xl mb-5`}>Ingresar</h1>

            <LoginForm />
        </div>
    );
};
import type { Metadata } from 'next'
import { RegisterForm } from './ui/RegisterForm';


export const metadata: Metadata = {
    title: 'template Title',
    description: 'template Description'
};

export default function template() {
    return (
        <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

            <h1 className={` text-4xl mb-5`}>Nueva cuenta</h1>

            <RegisterForm />
        </div>
    );

};
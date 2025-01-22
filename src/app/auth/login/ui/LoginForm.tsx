"use client";

import { Login } from '@/app/core/use-cases/auth/login';
import { useUserStore } from '@/app/store/user';
import Link from 'next/link'
import { useState } from 'react';

import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { BsArrowRight } from 'react-icons/bs';
import { IoMailOutline } from 'react-icons/io5';
import { MdSecurity } from 'react-icons/md';
import { useRouter } from 'next/router';


export interface FormInputs {

    email: string,
    password: string,
}

export const LoginForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState } = useForm<FormInputs>();
    const setUserId = useUserStore((state) => state.setUserId); // Accede a la función para actualizar el id
    const [errorMessage, setErrorMessage] = useState('')
    const onSubmit = async (data: FormInputs) => {
        const resp = await Login({ email: data.email.toLowerCase(), Password: data.password })
        console.log(resp)
        if (resp.ok) {

            setUserId(resp.user.id)
            router.push('/'); // Navegación interna sin recargar la página
        } else {
            setErrorMessage(resp.msg)
        }
    }
    return (
        <form className="flex flex-col mb-10 w-full  "
            onSubmit={handleSubmit(onSubmit)}
        // onSubmit={handleSubmit}
        >
            {

                formState.errors.email?.type === 'required' ? (
                    <span className="text-red-500 animate__animated animate__fadeIn">El campo email es obligatorio</span>
                )
                    :
                    formState.errors.email?.type === 'pattern' ? (
                        <span className="text-red-500 animate__animated animate__fadeIn">El campo email no tiene el formato correcto.</span>
                    )
                        :
                        formState.errors.password?.type === 'required' ? (
                            <span className="text-red-500 animate__animated animate__fadeIn">El campo contraseña es obligatorio</span>
                        ) :
                            errorMessage !== '' && (
                                <span className="text-red-500 animate__animated animate__fadeIn">{errorMessage}</span>
                            )
            }
            <label htmlFor="email" className='text-sm'>Correo electrónico</label>
            <div className="relative">
                <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    type="email"

                    {...register('email', { required: true })}
                />
            </div>


            <label htmlFor="email" className='text-sm'>Contraseña</label>
            <div className="relative">

                <MdSecurity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    type="password"

                    {...register('password', { required: true })}
                />
            </div>

            <div
                className='flex h-4 space-x-1 items-center justify-center pb-3'
                aria-live='polite'
                aria-atomic="true"
            >

            </div>
            <LoginButton />


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/register"
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}


function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <button className={`${!pending ? 'btn-primary' : 'btn-disabled'} flex h-[40px] items-center`} disabled={pending} type='submit'>
            Log in <BsArrowRight className='ml-auto h-5 w-5 text-gray-50' />
        </button>
    )
}
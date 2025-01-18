"use client"

import { Register } from "@/app/core/use-cases/auth/register";
// import { authenticate } from "@/actions/auth/login";
// import { RegisterUser } from "@/actions/auth/register";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"

export interface FormInputs {
    name: string,
    email: string,
    password: string,
    dni: string
}

export const RegisterForm = () => {

    const { register, handleSubmit, formState, reset } = useForm<FormInputs>();
    const [message, setMessage] = useState('')
    const router = useRouter()
    const onSubmit = async (data: FormInputs) => {
        const resp = await Register({ name: data.name, email: data.email, password: data.password, dni: data.dni })
        if (resp.ok) {
            setMessage('Usuario creado, ya puede logearse!')
            reset()
            //     router.push('/');
        }
    }
    return (
        <form className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
        >
            {message !== '' && <div className="bg-green-500 text-white p-2 rounded-sm" >{message}</div>
            }
            {
                formState.errors.name?.type === 'required' ? (
                    <span className="text-red-500">El campo nombre es obligatorio</span>
                )
                    :
                    formState.errors.email?.type === 'required' ? (
                        <span className="text-red-500">El campo email es obligatorio</span>
                    )
                        :
                        formState.errors.email?.type === 'pattern' ? (
                            <span className="text-red-500">El campo email no tiene el formato correcto.</span>
                        )
                            :
                            formState.errors.password?.type === 'required' && (
                                <span className="text-red-500">El campo contraseña es obligatorio</span>
                            )

            }
            <div className={`relative ${message !== '' ? 'h-[00px] opacity-0' : 'h-[400px] opacity-100'} transition-all duration-1000 overflow-hidden`}>
                <label htmlFor="email">Nombre completo</label>
                <input
                    className={`px-5 py-2 border bg-gray-200 rounded mb-5 w-full`} // ${formState.errors.name && 'border-red-500'}
                    type="text"
                    {...register('name', { required: true })}
                />


                <label htmlFor="email">Correo electrónico</label>
                <input
                    className={`px-5 py-2 border bg-gray-200 rounded mb-5 w-full`} // ${formState.errors.email && 'border-red-500'}

                    type="email"
                    {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
                />

                <label htmlFor="dni">Dni</label>
                <input
                    className={`px-5 py-2 border bg-gray-200 rounded mb-5 w-full`} // ${formState.errors.email && 'border-red-500'}

                    type="text"
                    {...register('dni', { required: true, pattern: /^\d{7,8}$/ })}
                />
                <label htmlFor="email">Contraseña</label>
                <input
                    className={`px-5 py-2 border bg-gray-200 rounded mb-5 w-full`} // ${formState.errors.password && 'border-red-500'}

                    type="password"
                    {...register('password', { required: true })}
                />

                <button

                    className="btn-primary w-full">
                    Crear cuenta
                </button>
            </div>
            {/* divisor l ine */}
            {message === '' &&
                <div className="flex items-center mb-5">
                    <div className="flex-1 border-t border-gray-500"></div>
                    <div className="px-2 text-gray-800">O</div>
                    <div className="flex-1 border-t border-gray-500"></div>
                </div>
            }

            <Link
                href="/auth/login"
                className="btn-secondary text-center mb-10 mt-2">
                Iniciar sesion
            </Link>
        </form>
    )
}

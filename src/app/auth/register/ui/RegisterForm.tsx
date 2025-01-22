"use client"

import { Register } from "@/app/core/use-cases/auth/register";
// import { authenticate } from "@/actions/auth/login";
// import { RegisterUser } from "@/actions/auth/register";
import Link from "next/link"
import { useState } from "react";
import { useForm } from "react-hook-form"
import { BiCreditCard } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import { MdSecurity } from "react-icons/md";
import { TiUserOutline } from "react-icons/ti";

export interface FormInputs {
    name: string,
    email: string,
    password: string,
    dni: string
}

export const RegisterForm = () => {

    const { register, handleSubmit, formState, reset } = useForm<FormInputs>();
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const onSubmit = async (data: FormInputs) => {
        const resp = await Register({ name: data.name, email: data.email.toLowerCase(), password: data.password, dni: data.dni })
        if (resp.ok) {
            setMessage('Usuario creado, ya puede logearse!')
            reset()
            setErrorMessage('')
            //     router.push('/');
        } else {
            setErrorMessage(resp.msg ?? '')
        }
    }
    return (
        <form className="flex flex-col w-full"
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
                            formState.errors.password?.type === 'required' ? (
                                <span className="text-red-500">El campo contraseña es obligatorio</span>
                            ) :
                                errorMessage !== '' && (
                                    <span className="text-red-500">{errorMessage}</span>
                                )

            }
            <div
                className={`grid overflow-hidden transition-all duration-1000 ease-in-out ${message !== ''
                    ? 'max-h-0 opacity-0'
                    : 'max-h-[500px] opacity-100'
                    }`}
            >
                <label htmlFor="name" className="text-sm">Nombre</label>
                <div className="relative">
                    <TiUserOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        type="text"
                        {...register('name', { required: true })}
                    />
                </div>

                <label htmlFor="email" className="text-sm">Correo electrónico</label>
                <div className="relative">
                    <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        type="email"
                        {...register('email', {
                            required: true,
                            pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                        })}
                    />
                </div>

                <label htmlFor="dni" className="text-sm">DNI</label>
                <div className="relative">
                    <BiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        type="text"
                        {...register('dni', { required: true, pattern: /^\d{7,8}$/ })}
                    />
                </div>

                <label htmlFor="password" className="text-sm">Contraseña</label>
                <div className="relative mb-5">
                    <MdSecurity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        type="password"
                        {...register('password', { required: true })}
                    />
                </div>

                <button className="btn-primary w-full">Crear cuenta</button>
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
                className="btn-secondary text-center mb-10 mt-2 z-10">
                Iniciar sesion
            </Link>
        </form>
    )
}

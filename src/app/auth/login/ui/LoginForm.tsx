"use client";

import Link from 'next/link'

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { BsArrowRight, BsExclamationCircle } from 'react-icons/bs';

export interface FormInputs {

    email: string,
    password: string,
}

export const LoginForm = () => {
    const { register, handleSubmit, formState } = useForm<FormInputs>();
    // const [state, dispatch] = useFormState( undefined)
    // useEffect(() => {
    //     if (state === 'authenticated') {
    //         window.location.replace('/')
    //     }
    // }, [state])
    const onSubmit = async (data: FormInputs) => {
        console.log({ data })
        // const { email, name, password } = data;

        // const resp = await RegisterUser(name, email, password);
        // if (resp.ok) {

        //     const formData = new FormData();
        //     formData.append('email', email.toLowerCase());
        //     formData.append('password', password);
        //     dispatch(formData);
        // }
    }
    return (
        <form className="flex flex-col mb-10"
            onSubmit={handleSubmit(onSubmit)}
        // onSubmit={handleSubmit}
        >
            {
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
            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"

                {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
            />



            <label htmlFor="email">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"

                {...register('password', { required: true })}
            />

            <div
                className='flex h-8 space-x-1 items-center justify-center pb-3'
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
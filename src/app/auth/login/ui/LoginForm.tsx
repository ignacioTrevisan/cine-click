"use client";

import Link from 'next/link'

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { BsArrowRight, BsExclamationCircle } from 'react-icons/bs';


export const LoginForm = () => {
    // const [state, dispatch] = useFormState( undefined)
    // useEffect(() => {
    //     if (state === 'authenticated') {
    //         window.location.replace('/')
    //     }
    // }, [state])

    return (
        <form className="flex flex-col"

        // onSubmit={handleSubmit}
        >

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                name='email'
            />



            <label htmlFor="email">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                name='password'
            />

            <div
                className='flex h-8 space-x-1 items-center justify-center pb-3'
                aria-live='polite'
                aria-atomic="true"
            >
                {/* {state === 'authentication error' && (
                    <>
                        <BsExclamationCircle className='h-5 w-5 text-red-500' />
                        <p className='text-sm text-red-500'>Invalid credentials</p>
                    </>
                )

                } */}
            </div>
            <LoginButton />


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}


function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <button className={`${!pending ? 'btn-primary' : 'btn-disabled'}`} disabled={pending} type='submit'>
            Log in <BsArrowRight className='ml-auto h-5 w-5 text-gray-50' />
        </button>
    )
}
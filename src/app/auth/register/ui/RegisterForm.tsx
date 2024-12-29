"use client"

// import { authenticate } from "@/actions/auth/login";
// import { RegisterUser } from "@/actions/auth/register";
import Link from "next/link"
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form"

export interface FormInputs {
    name: string,
    email: string,
    password: string,
}

export const RegisterForm = () => {

    const { register, handleSubmit, formState } = useForm<FormInputs>();
    // const [state, dispatch] = useFormState(authenticate, undefined)
    // useEffect(() => {
    //     if (state === 'authenticated') {
    //         window.location.replace('/')
    //     }
    // }, [state])
    const onSubmit = async (data: FormInputs) => {
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
        <form className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
        >

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
            <label htmlFor="email">Nombre completo</label>
            <input
                className={`px-5 py-2 border bg-gray-200 rounded mb-5`} // ${formState.errors.name && 'border-red-500'}
                type="text"
                {...register('name', { required: true })}
            />


            <label htmlFor="email">Correo electrónico</label>
            <input
                className={`px-5 py-2 border bg-gray-200 rounded mb-5`} // ${formState.errors.email && 'border-red-500'}

                type="email"
                {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
            />


            <label htmlFor="email">Contraseña</label>
            <input
                className={`px-5 py-2 border bg-gray-200 rounded mb-5`} // ${formState.errors.password && 'border-red-500'}

                type="password"
                {...register('password', { required: true })}
            />

            <button

                className="btn-primary">
                Crear cuenta
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center mb-10">
                Iniciar sesion
            </Link>

        </form>
    )
}

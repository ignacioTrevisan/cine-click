"use client"
import { redirect } from 'next/navigation';
import React from 'react'
import { BiCalendar, BiMoviePlay } from 'react-icons/bi';
import { BsArrowLeft, BsTicket } from 'react-icons/bs';
import { TbClockBitcoin } from 'react-icons/tb';

interface Props {
    slug: string,
    date: string,
    time: string,
    movie: string,
    quantity: number
}
export const Cart = ({ slug, date, time, movie, quantity }: Props) => {
    return (
        <div className="max-w-2xl mx-auto">
            <button
                onClick={() => redirect(`/movie/${slug}`)}
                className="flex items-center text-teal-600 hover:text-teal-700 mb-6 transition-colors"
            >
                <BsArrowLeft className="w-5 h-5 mr-2" />
                Volver a la selección
            </button>

            <div className="bg-white rounded-2xl shadow-lg p-8">

                <div className="flex items-center justify-center mb-8">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                        <BsTicket className="w-8 h-8 text-teal-600" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">¡Gracias por tu compra!</h2>
                <p className="text-center text-gray-600 mb-8">
                    Tu reserva se ha completado con éxito
                </p>

                <div className="border-t border-b border-gray-100 py-6 space-y-4 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <BiMoviePlay className="w-5 h-5 text-teal-600" />
                            <span className="text-gray-600">Película</span>
                        </div>
                        <span className="font-medium">{movie}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <BiCalendar className="w-5 h-5 text-teal-600" />
                            <span className="text-gray-600">Fecha</span>
                        </div>
                        <span className="font-medium">{date}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <TbClockBitcoin className="w-5 h-5 text-teal-600" />
                            <span className="text-gray-600">Hora</span>
                        </div>
                        <span className="font-medium">{time}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <BsTicket className="w-5 h-5 text-teal-600" />
                            <span className="text-gray-600">Entradas</span>
                        </div>
                        <span className="font-medium">{quantity > 1 ? `${quantity} personas` : '1 persona'}</span>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-500 mb-4">
                        Recibirás un correo electrónico con los detalles de tu compra
                    </p>
                    <button
                        className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                        onClick={() => {
                            redirect(`/profile`);
                        }}
                    >
                        Ver mi perfil
                    </button>
                </div>
            </div>
        </div>
    )
}

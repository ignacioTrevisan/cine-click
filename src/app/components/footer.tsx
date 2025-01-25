import React from 'react'
import { TbMailBitcoin } from 'react-icons/tb'

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-6 mt-auto">
            <div className="max-w-4xl mx-auto px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-sm">
                        © {new Date().getFullYear()} Cinema Tickets. Todos los derechos reservados.
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <TbMailBitcoin className="w-4 h-4" />
                        <a
                            href="mailto:Nachotizii988@gmail.com"
                            className="hover:text-teal-400 transition-colors"
                        >
                            Nachotizii988@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

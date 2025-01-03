'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

interface Props {
    url: string,
    text: string,
    icon: ReactNode,
    path: string
}
export const SidebarButton = ({ url, text, icon, path }: Props) => {
    const pathUrl = usePathname();
    return (

        <Link href={url} className={`w-full h-[30px] flex items-center gap-1 ml-2 cursor-pointer ${pathUrl === path && 'bg-gray-400 text-white'} hover:bg-gray-500 p-1 hover:text-white`}>
            {icon}{text}

        </Link>
    )
}

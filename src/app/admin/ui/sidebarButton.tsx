'use client'

import Link from "next/link"
import { ReactNode } from "react"

interface Props {
    url: string,
    text: string,
    icon: ReactNode
}
export const SidebarButton = ({ url, text, icon }: Props) => {
    return (
        <div className="w-full h-[30px] flex items-center gap-1 cursor-pointer hover:bg-gray-500 p-1 hover:text-white">
            {icon}{text}
            <Link href={url} />
        </div>
    )
}

"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
    path: string,
    icon: ReactNode,
    title: string,
    subTitle: string
}

export const SidebarMenuItem = ({ path, icon, title, subTitle }: Props) => {

    const currentPath = usePathname(); // Corregido el nombre de la variable

    return (
        <Link href={path} className={`
            w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150
            ${currentPath === path ? 'bg-blue-800' : ''} 
        `}>
            {/* 2. CORRECCIÓN: Aquí borré el SVG fijo y puse la variable icon */}
            <div>
                {icon}
            </div>

            <div className="flex flex-col">
                <span className="text-lg font-bold leading-5 text-white">{title}</span>
                <span className="text-sm text-white/50 hidden md:block">{subTitle}</span>
            </div>
        </Link>
    )
}

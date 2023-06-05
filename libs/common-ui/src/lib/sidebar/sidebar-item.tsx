import React from 'react'
import Link from "next/link";

interface Props {
    icon: any;
    name: string;
    link: string;
    active: boolean;
}

function SidebarItem({ icon, name , link, active}: Props) {
    return (
        <Link
            href={link}
            className={`group relative flex justify-center rounded 
            my-2
             px-2 py-1.5 text-sidebarSecondary  bg-sidebarPrimary/20
             ${active && '!bg-sidebarSecondary !text-sidebarPrimary'}
             `}
        >
            {icon}
            <span
                className="z-[10] absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-sidebarSecondary text-sidebarPrimary px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
            >
                {name}
            </span>
        </Link>
    )
}

export default SidebarItem
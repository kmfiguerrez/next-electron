"use client"

import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'


type TMenuLinkProps = {
  item: {title: string, icon: React.ReactNode, path: string}
}


const MenuLink: React.FC<TMenuLinkProps> = ({ item }) => {

  const pathname = usePathname()

  return (
    <Link 
      href={item.path}
      className={`p-5 flex space-x-2 items-center hover:bg-zinc-700 rounded-md ${pathname === item.path && 'bg-zinc-700'}`}
    >
      {item.icon}

      <span>
        {item.title}
      </span>

    </Link>
  )
}

export default MenuLink
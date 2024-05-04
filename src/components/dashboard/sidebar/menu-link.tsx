import React from 'react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'


type TMenuLinkProps = {
  item: {title: string, icon: React.ReactNode, path: string}
}


const MenuLink: React.FC<TMenuLinkProps> = ({ item }) => {
  return (
    // <Button 
    //   variant={'link'} 
    //   className=''
    //   asChild
    // >
      <Link 
        href={item.path}
        className='p-5 flex space-x-2 items-center'
      >
        {item.icon}

        <span>
          {item.title}
        </span>

      </Link>
    // </Button>
  )
}

export default MenuLink
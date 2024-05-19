'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { useCurrentUserContext } from '@/components/providers/current-user/user-context'

import MenuLink from './menu-link'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Separator } from "@/components/ui/separator"

import { Button } from '@/components/ui/button'

import { 
  BarChart4,
  BriefcaseBusiness,
  CircleDollarSign,
  CircleUserRound, 
  FileQuestion, 
  LayoutDashboard, 
  LogOut, 
  Settings, 
  ShoppingBag,
  Users
} from 'lucide-react'



const Sidebar = () => {
  const router = useRouter()

  const { user: currentUser, dispatch } = useCurrentUserContext()

  return (
    <div className='sticky'>
      <div className='flex space-x-5 items-center'>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className='flex flex-col'>
          <span className='capitalize font-semibold'>{currentUser?.name}</span>
          <span className='text-sm text-zinc-400'>{currentUser?.designation}</span>
        </div>
      </div>

      <Separator className='mt-4 mb-8' />

      <ul className='space-y-3 mb-4'>
        {menuItems.map(category => (
            <li key={category.title}>
              <span className='text-sm accent-white'>
                {category.title}
              </span>

              <div className='flex flex-col'>
                {category.list.map(item => (
                    <MenuLink item={item} key={item.title} />
                  ))
                }
              </div>
            </li>
          ))
        }
      </ul>

      <Separator className='mt-4 mb-4' />

      <Button
        variant={"ghost"}
        className='dark:hover:bg-zinc-600 text-lg'
        onClick={() => {
          dispatch({
            type: "signOut"
          })

          router.push("/login")
        }}
      >
        <LogOut className="mr-2" />
        Logout
      </Button>
    </div>
  )
}

export default Sidebar

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard height={20} width={20} />,
      },
      {
        title: "Employees",
        path: "/dashboard/employees",
        icon: <CircleUserRound height={20} width={20} />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <CircleUserRound height={20} width={20} />,
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <CircleDollarSign height={20} width={20} />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <BriefcaseBusiness height={20} width={20} />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <BarChart4 height={20} width={20} />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <Users height={20} width={20} />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <Settings height={20} width={20} />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <FileQuestion height={20} width={20} />,
      },
    ],
  },
];
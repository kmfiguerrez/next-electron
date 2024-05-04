// import { menuItems } from '@/lib/constants'
import React from 'react'

import MenuLink from './menu-link'

import { 
  BarChart4,
  BriefcaseBusiness,
  CircleDollarSign,
  CircleUserRound, 
  FileQuestion, 
  LayoutDashboard, 
  Settings, 
  ShoppingBag,
  Users
} from 'lucide-react'


const Sidebar = () => {
  return (
    <div className='sticky'>
      <div>
        {/* Avatar here */}
      </div>

      <ul className='space-y-3'>
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
        title: "Users",
        path: "/dashboard/users",
        icon: <CircleUserRound height={20} width={20} />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <ShoppingBag height={20} width={20} />,
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
import React, { ReactNode } from 'react'

import Link from 'next/link'

import { Button } from '../ui/button'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type TCardWrapperProps = {
  children: ReactNode
  title: string
  className?: string
  backButtonHref: string
  backButtonLabel: string
  showSocial?: boolean

}

const CardWrapper: React.FC<TCardWrapperProps> = ({ 
  children,
  title,
  backButtonHref,
  backButtonLabel
}) => {
  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className=''>
        {children}
      </CardContent>
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>      
    </Card>

  )
}


type BackButtonProps = {
  href: string
  label: string
}

const BackButton: React.FC<BackButtonProps> = ({ label, href }) => {
  return (
    <Button
      variant={"link"}
      className='font-normal w-full'
      size={"sm"}
      asChild
    >
      <Link
       href={href}
      >
        {label}
      </Link>
    </Button>
  )
}
export default CardWrapper
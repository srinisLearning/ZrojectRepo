"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import PrivateLayout from './private-layout'
import PublicLayout from './public-layout'

const CustomLayout = ({children}:{children:React.ReactNode}) => {

   const pathname = usePathname()
   if (pathname.includes('/account')) {
      return (
         <PrivateLayout>
            {children}
         </PrivateLayout>
      )
   }
  return (
     <>
      <PublicLayout>
         {children}
      </PublicLayout>
     
     </>
  )
}

export default CustomLayout
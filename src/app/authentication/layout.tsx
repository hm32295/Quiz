import Image from 'next/image'
import React from 'react'

import auth from '../../../public/auth.png'
import logo from '../../../public/authLogo.png'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
    <>
        
         <div className="p-[20px] sm:p-[50px] min-h-[100vh] overflow-auto flex justify-center items-center bg-[#0D1321]  ">
               <div className='w-full max-w-[1350px] flex items-start gap-[50px] justify-center'>
                  <div className="w-full lg:w-[50%] max-w-[600px]" >
                    <Image alt='logo' src={logo} className='w-[100px] mb-5'/>

                    {children}
                    
                  </div>
                  <div className="bg-[#FFEDDF]  hidden lg:flex pl-[48px] pr-[48px] rounded-[20px] w-[50%]">
                    <Image alt="auth" src={auth} className="w-full"/>
                  </div>
               </div>
              </div>
        
    </>
   
   
  )
}

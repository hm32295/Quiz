import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
interface typeData {
  content:string
  children:React.ReactNode
  link?:string
  title?:string
}
export default function Button({content,children,link,title}:typeData) {
  const {t} = useTranslation()
  return (
    <div className='flex items-center justify-between text-12px sm:text-[18px]'>

      <button type='submit' className='cursor-pointer capitalize flex items-center justify-center gap-2 py-1.5 sm:py-3 px-3 sm:px-6 rounded-[8px] sm:rounded-2xl bg-white'>{children}{content}</button>
      {title && link?(
          <div className='text-white capitalize'>
                {title} <span className='text-[#C5D86D]'><Link href={link}>{t('linkForgetLogin')}</Link></span>
          </div>
      ):null}
    </div>
  )
}

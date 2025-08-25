import React from 'react'
import {UseFormRegister } from 'react-hook-form'
interface LoginFormInputs {
  email: string;
  password: string;
};

interface TypeData {
  label:string
  placeholder:string
  type:string
  children:React.ReactNode
  name:string
  validation:{required: string;
    pattern?: {
        value: RegExp;
        message: string;
    };}
  register: UseFormRegister<LoginFormInputs>
  error:any

}
export default function Input({label,placeholder,type,children,register,name,validation ,error}:TypeData) {
  
  return (
    <div className='w-full mb-[25px]'> 
      <label className='text-white w-full block mb-[5px] ml-[10px] capitalize' htmlFor={type+placeholder}>{label}</label>
      <div className='w-full rounded-[10px] border-2 flex-row-reverse justify-center items-center border-white bg-[#0D1321] flex gap-0.5 py-[10px] px-[16px] '>

        <input {...(register ? register(name, validation) : {})} id={type+placeholder} type={type} placeholder={placeholder} className=" bg-transparent text-white w-full text-[14px] ml-[8px] outline-0" />
        {children}
      </div>
      {error ? error[name]&&<div className='text-amber-600 capitalize'>{error[name].message}</div> : ''}
    </div>
  )
}

"use client";
import { FaUserPlus, FaUserTie } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setRegister } from '@/redux/Features/login';
import { useRouter } from 'next/navigation';

export default function IconSAuthentication() {
   const { value } = useSelector((state: any) => state.login);
  const dispatch = useDispatch();
   const router = useRouter()
  
  return (
    <div className='flex gap-3 mb-3 '>
      <div
          onClick={()=>{
            dispatch(setLogin())
            router.push('/authentication/register')

          }}
        className={ `cursor-pointer px-9 py-5 bg-[#333] flex gap-1.5 ${value === 'register' ?('border-4  border-[#C5D86D]') :''} rounded-[8px] justify-center items-center flex-col`}>
        <FaUserPlus className={`text-4xl ${value === 'register' ?('text-[#C5D86D]') :'text-white '} `}/>
        <span className='text-white capitalize'>sign up</span> 

      </div >
      <div 
          onClick={(e)=>{
           dispatch(setRegister())
           router.push('/authentication/login')
            
          }}
        className={`cursor-pointer px-9 py-5 bg-[#333] flex gap-1.5 ${value === 'login' ?('border-4  border-[#C5D86D]') :''} rounded-[8px] justify-center items-center flex-col`}>
         <FaUserTie className={`text-4xl ${value === 'login' ?('text-[#C5D86D]') :'text-white '} `}/>
        <span className='text-white capitalize'>sign in</span>
      </div>
    </div>
  )
}

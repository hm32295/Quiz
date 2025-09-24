'use client';
import Button from '@/components/button/button'
import Input from '@/components/input/input'
import MoonLoaderToButton from '@/components/spinners/MoonLoaderToButton';
import TitleAuth from '@/components/titleAuth/titleAuth'
import { changePasswordTypes } from '@/interfaces/interfaces';
import { changePasswordUser } from '@/redux/Features/changePassword';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
export default function ChangePassword() {
  const dispatch = useDispatch<AppDispatch>();
 const[ loading ,setLoading] = useState(false)
  const { t,i18n } = useTranslation();
  const direction = i18n.dir()

  const { register, handleSubmit, formState:{errors},reset } = useForm<changePasswordTypes>();
  const router = useRouter()
  const submit = async (data:changePasswordTypes)=>{
    
    setLoading(true)
    try {


      const response = await dispatch(changePasswordUser(data));

      if (changePasswordUser.fulfilled.match(response)) {
        reset();
        toast.success(t("toastSuccessRegister") || "Register Success");
        router.push("../");
      } else {
        const errorPayload = response.payload as { message?: string };
        toast.error(errorPayload?.message || "Email or password invalid");
      }
      
    } catch (error) {
      console.log(error);
      
    }
    setLoading(false)
      
    }
  return (
    <>
      <button
        onClick={() => router.back()}
        className="flex self-start cursor-pointer items-center gap-2 mb-4 px-4 py-2 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 capitalize transition-all duration-300"
      >
        {direction === 'rtl' ? <FaArrowRight /> : <FaArrowLeft />}
        {t('studentsPage.buttons.back')}
      </button>
    <form onSubmit={handleSubmit(submit)}>
      <TitleAuth content={t('titleChangePassword')} />
      
     
      <Input 
          startWithIcon={<RiLockPasswordLine color='#fff' size={'30px'}/>} 
          error={errors.password?.message} 
          label={t('labelOldPasswordChangePassword')} 
          type='password' 
          placeholder={t('placeholderOldPasswordChangePassword')}
          {...register('password',{required:'the failed is required'})}
         />
      <Input 
          startWithIcon={<RiLockPasswordLine color='#fff' size={'30px'}/>} 
          error={errors.password?.message} 
          label={t('labelNewPasswordChangePassword')} 
          placeholder={t('placeholderNewPasswordChangePassword')}
          type='password' 
          {...register('password_new',{required:'the failed is required'})}
         />
 
      <Button  content={t('buttonChange')} >
          {loading ? <MoonLoaderToButton/> : <IoMdSend/>}
      </Button>

    </form>
    </>
  )
}

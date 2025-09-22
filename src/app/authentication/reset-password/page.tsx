'use client';
import Button from '@/components/button/button'
import Input from '@/components/input/input'
import MoonLoaderToButton from '@/components/spinners/MoonLoaderToButton';
import TitleAuth from '@/components/titleAuth/titleAuth'
import {  resetPasswordTypes } from '@/interfaces/interfaces';
import { resetPasswordUser } from '@/redux/Features/resetPassword';
import { AppDispatch } from '@/redux/store';
import { EMAIL_VALIDATION } from '@/services/validation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next';
import { IoMdSend } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useTranslation();


  const { register, handleSubmit, formState:{errors},reset } = useForm<resetPasswordTypes>();
    
  const submit =async (data:resetPasswordTypes)=>{
    
    setLoading(true)
    try {
        
    const response = await dispatch(resetPasswordUser(data));
     if (resetPasswordUser.fulfilled.match(response)) {
            reset()
            toast.success(response.payload.message || t('toastSuccessRegister') || 'Register Success');
            router.push('/authentication/login')
      }else {
          toast.error(response.error?.message || 'Email or password invalid');
        }
    } catch (error) {
      console.log(error);
      
    }
      setLoading(false)
    }
  return (
    <form onSubmit={handleSubmit(submit)}>
      
      <TitleAuth content={t('titleResetPassword')} />
      <Input type={'text'} register={register} error={errors} validation={EMAIL_VALIDATION} name='email' label={t('labelEmailRegister')} placeholder={t('placeholderEmailLogin')} >
        <MdEmail color='#fff' size={'30px'}/>
      </Input>

      <Input type={'text'} register={register} error={errors}  validation={{ required: t('messageOtpResetPassword') }} name='otp' label={t('labelOtpResetPassword')} placeholder={t('placeholderOtpResetPassword')} >
        <MdEmail color='#fff' size={'30px'}/>
      </Input>


      <Input error={errors} register={register} validation={{ required: t('messagePasswordLogin') }} 
          name='password' type={'password'}  label={t('labelPasswordLogin')} placeholder={t('placeholderPasswordLogin')} >
        <RiLockPasswordLine color='#fff' size={'30px'}/>
      </Input>
     
      <Button content={t('buttonReset')} >
          {loading ? <MoonLoaderToButton/> : <IoMdSend/>}
      </Button>

    </form>
  )
}

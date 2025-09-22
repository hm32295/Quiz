'use client';
import Button from '@/components/button/button'
import Input from '@/components/input/input'
import MoonLoaderToButton from '@/components/spinners/MoonLoaderToButton';
import TitleAuth from '@/components/titleAuth/titleAuth'
import { ForgetPasswordTypes } from '@/interfaces/interfaces';
import {  forgetPasswordUser } from '@/redux/Features/forgetPassword';
import { AppDispatch } from '@/redux/store';
import { EMAIL_VALIDATION } from '@/services/validation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next';
import { IoMdSend } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
export default function ForgetPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading , setLoading] = useState(false)
  const router = useRouter()
 
  const { t } = useTranslation();


  const { register, handleSubmit, formState:{errors},reset } = useForm<ForgetPasswordTypes>();
    
  const submit = async (data:ForgetPasswordTypes)=>{
    
      setLoading(true)
    try {
     const response = await dispatch(forgetPasswordUser(data));
    
      if (forgetPasswordUser.fulfilled.match(response)) {
        reset()
        toast.success(t('toastSuccessRegister') || 'Register Success');
        router.push('/authentication/reset-password')
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
      
      <TitleAuth content={t('titleForgetPassword')} />
      <Input 
        type='email'
        {...register('email',EMAIL_VALIDATION)}
        error={errors.email?.message}
        label={t('labelEmailForgetPassword')} placeholder={t('placeholderEmailLogin')}
        startWithIcon={<MdEmail color='#fff' size={'30px'}/>}
      />
      {/* <Input type={'text'} register={register} error={errors} validation={EMAIL_VALIDATION} name='email' 
      label={t('labelEmailForgetPassword')} placeholder={t('placeholderEmailLogin')} >
        <MdEmail color='#fff' size={'30px'}/>
      </Input> */}

      <Button link={'/authentication/login'} title={t('linkTitleForgetPassword')} content={t('buttonForgetPassword')} >
          {loading ? <MoonLoaderToButton/> : <IoMdSend/>}
      </Button>

    </form>
  )
}

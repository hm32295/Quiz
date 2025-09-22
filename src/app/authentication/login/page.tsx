'use client';
import Button from '@/components/button/button'
import IconSAuthentication from '@/components/iconSAuthentication/IconSAuthentication';
import Input from '@/components/input/input'
import MoonLoaderToButton from '@/components/spinners/MoonLoaderToButton';
import TitleAuth from '@/components/titleAuth/titleAuth'
import { LoginFormInputs } from '@/interfaces/interfaces';
import { loginUser } from '@/redux/Features/login';
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
export default function Login() {
  const dispatch = useDispatch();
  const [loading ,setLoading] = useState(false)
  const rout = useRouter() 
  const { t } = useTranslation();


  const { register, handleSubmit, formState:{errors},reset } = useForm<LoginFormInputs>();
    
  const submit =async (data:LoginFormInputs)=>{
    data = {data,toast, reset,t,rout}
    setLoading(true)
    try {
     await dispatch(loginUser(data as any) as any);
      
    } catch (error) {
      console.log(error);
      
    }
      setLoading(false)
    }
  return (
    <form onSubmit={handleSubmit(submit)}>
      
      <TitleAuth content={t('tiltLogin')} />
      <IconSAuthentication />
      <Input type={'text'} register={register} error={errors} validation={EMAIL_VALIDATION} name='email' label={t('labelEmailLogin')} placeholder={t('placeholderEmailLogin')} >
        <MdEmail color='#fff' size={'30px'}/>
      </Input>


      <Input error={errors} register={register} validation={{ required: t('messagePasswordLogin') }} 
          name='password' type={'password'}  label={t('labelPasswordLogin')} placeholder={t('placeholderPasswordLogin')} >
        <RiLockPasswordLine color='#fff' size={'30px'}/>
      </Input>
     
      <Button link={'/authentication/forget-password'} title={t('linkTitleLogin')} content={t('buttonLogin')} >
          {loading ? <MoonLoaderToButton/> : <IoMdSend/>}
      </Button>

    </form>
  )
}

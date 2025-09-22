'use client';
import Button from '@/components/button/button'
import IconSAuthentication from '@/components/iconSAuthentication/IconSAuthentication';
import Input from '@/components/input/input'
import MoonLoaderToButton from '@/components/spinners/MoonLoaderToButton';
import TitleAuth from '@/components/titleAuth/titleAuth'
import { LoginFormInputs } from '@/interfaces/interfaces';
import { loginUser } from '@/redux/Features/login';
import { AppDispatch } from '@/redux/store';
import { EMAIL_VALIDATION } from '@/services/validation';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next';
import { IoMdSend } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import CookieServices from "@/services/cookies/clientCookie";
export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading ,setLoading] = useState(false)
  const rout = useRouter() 
  const { t } = useTranslation();


  const { register, handleSubmit, formState:{errors},reset } = useForm<LoginFormInputs>();
    
const submit = async (formData: LoginFormInputs) => {
  setLoading(true);
  try {
    const response = await dispatch(loginUser(formData));

   

    if (loginUser.fulfilled.match(response)) {
      const { accessToken, refreshToken, profile } = response.payload.data;
      
      toast.success(response.payload.data?.message || t('loginSuccess') || 'Login Success');
      reset();
      rout.push(profile.role === 'Student' ? '/learner/dashboard' : '/instructor/dashboard');

      setCookie("accessToken", accessToken, { path: "/", maxAge: 60 * 60 * 24 * 7 });
      setCookie("refreshToken", refreshToken, { path: "/", maxAge: 60 * 60 * 24 * 30 });
      setCookie("profile", JSON.stringify(profile), { path: "/", secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
      CookieServices.set('profile', JSON.stringify(profile));

    } else {
      toast.error(response.error?.message || 'Email or password invalid');
    }
  } catch (error) {
    console.log(error);
  }
  setLoading(false);
};

  return (
    <form onSubmit={handleSubmit(submit)}>
      
      <TitleAuth content={t('tiltLogin')} />
      <IconSAuthentication />




      <Input startWithIcon={<MdEmail color='#fff' 
              size={'30px'}/>} 
              type='text' 
              {...register("email" ,EMAIL_VALIDATION)} 
              error={errors.email?.message}  
              label={t('labelEmailLogin')} 
              placeholder={t('placeholderEmailLogin')} 
        />


      <Input startWithIcon={<MdEmail color='#fff'  size={'30px'}/>} 
              type='password' 
              {...register("password" ,{required:'the field is required'})} 
              error={errors.password?.message}  
              label={t('labelPasswordLogin')} 
              placeholder={t('placeholderPasswordLogin')} 
        />



      {/* <Input type={'text'} register={register} error={errors} validation={EMAIL_VALIDATION} name='email' label={t('labelEmailLogin')} placeholder={t('placeholderEmailLogin')} >
        <MdEmail color='#fff' size={'30px'}/>
      </Input> */}

{/* 
      <Input error={errors} register={register} validation={{ required: t('messagePasswordLogin') }} 
          name='password' type={'password'}  label={t('labelPasswordLogin')} placeholder={t('placeholderPasswordLogin')} >
        <RiLockPasswordLine color='#fff' size={'30px'}/>
      </Input> */}
     
      <Button link={'/authentication/forget-password'} title={t('linkTitleLogin')} content={t('buttonLogin')} >
          {loading ? <MoonLoaderToButton/> : <IoMdSend/>}
      </Button>

    </form>
  )
}

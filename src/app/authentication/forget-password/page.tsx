'use client';
import Button from '@/components/button/button'
import Input from '@/components/input/input'
import MoonLoaderToButton from '@/components/spinners/MoonLoaderToButton';
import TitleAuth from '@/components/titleAuth/titleAuth'
import { ForgetPasswordTypes } from '@/interfaces/interfaces';
import {  forgetPasswordUser } from '@/redux/Features/forgetPassword';
import { EMAIL_VALIDATION } from '@/services/validation';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next';
import { IoMdSend } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
export default function ForgetPassword() {
  const dispatch = useDispatch();
  const { isLoading,error,data} = useSelector(state => state.login );
  const router = useRouter()
 
  const { t } = useTranslation();


  const { register, handleSubmit, formState:{errors},reset } = useForm<ForgetPasswordTypes>();
    
  const submit = (data:ForgetPasswordTypes)=>{
    data = {data,toast, reset,t,router}
      dispatch(forgetPasswordUser(data));
      
    }
  return (
    <form onSubmit={handleSubmit(submit)}>
      
      <TitleAuth content={t('titleForgetPassword')} />
      <Input type={'text'} register={register} error={errors} validation={EMAIL_VALIDATION} name='email' label={t('labelEmailForgetPassword')} placeholder={t('placeholderEmailLogin')} >
        <MdEmail color='#fff' size={'30px'}/>
      </Input>

      <Button link={'/authentication/login'} title={t('linkTitleForgetPassword')} content={t('buttonForgetPassword')} >
          {isLoading ? <MoonLoaderToButton/> : <IoMdSend/>}
      </Button>

    </form>
  )
}

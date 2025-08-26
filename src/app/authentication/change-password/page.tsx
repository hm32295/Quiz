'use client';
import Button from '@/components/button/button'
import IconSAuthentication from '@/components/iconSAuthentication/IconSAuthentication';
import Input from '@/components/input/input'
import MoonLoaderToButton from '@/components/spinners/MoonLoaderToButton';
import TitleAuth from '@/components/titleAuth/titleAuth'
import { changePasswordTypes } from '@/interfaces/interfaces';
import { changePasswordUser } from '@/redux/Features/changePassword';
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next';
import { IoMdSend } from 'react-icons/io'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
export default function ChangePassword() {
  const dispatch = useDispatch();
  const { isLoading,error,data} = useSelector(state => state.login );
 
  const { t } = useTranslation();


  const { register, handleSubmit, formState:{errors},reset } = useForm<changePasswordTypes>();
    
  const submit = (data:changePasswordTypes)=>{
    data = {data,toast, reset,t}
      dispatch(changePasswordUser(data));
      
    }
  return (
    <form onSubmit={handleSubmit(submit)}>
      
      <TitleAuth content={t('titleChangePassword')} />
      
     
      <Input error={errors} register={register} validation={{ required: t('messagePasswordLogin') }} 
          name='password' type={'password'}  label={t('labelOldPasswordChangePassword')} placeholder={t('placeholderOldPasswordChangePassword')} >
        <RiLockPasswordLine color='#fff' size={'30px'}/>
      </Input>
      <Input error={errors} register={register} validation={{ required: t('messagePasswordLogin') }} 
          name='password_new' type={'password'}  label={t('labelNewPasswordChangePassword')} placeholder={t('placeholderNewPasswordChangePassword')} >
        <RiLockPasswordLine color='#fff' size={'30px'}/>
      </Input>
     
      <Button  content={t('buttonChange')} >
          {isLoading ? <MoonLoaderToButton/> : <IoMdSend/>}
      </Button>

    </form>
  )
}

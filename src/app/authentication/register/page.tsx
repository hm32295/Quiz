'use client';
import Button from '@/components/button/button'
import IconSAuthentication from '@/components/iconSAuthentication/IconSAuthentication';
import Input from '@/components/input/input'
import SelectRegister from '@/components/selectBoxRegester/selectBoxRegester';
import SelectBox from '@/components/selectBoxRegester/selectBoxRegester';
import MoonLoaderToButton from '@/components/spinners/MoonLoaderToButton';
import TitleAuth from '@/components/titleAuth/titleAuth'
import { RegisterForm } from '@/interfaces/interfaces';
import { registerUser } from '@/redux/Features/register';
import { AppDispatch } from '@/redux/store';
import { EMAIL_VALIDATION } from '@/services/validation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next';
import { FaRegIdCard } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation();
  const router = useRouter()

  const { register, handleSubmit, formState:{errors},reset } = useForm<RegisterForm>();
    
  const submit = async (data:RegisterForm)=>{
   setLoading(true)
    try {
      const response =  await dispatch(registerUser(data));
       console.log(response);
    
       if (registerUser.fulfilled.match(response)) {
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
      
      <TitleAuth content={t('tiltRegister')} />
      
      <IconSAuthentication />
      <Input 
        label={t('labelEmailRegister')} placeholder={t('placeholderEmailLogin')} 
        type='email'
        {...register('email',EMAIL_VALIDATION)}
        error={errors.email?.message}
        startWithIcon={<MdEmail color='#fff' size={'30px'}/>}
      />


      <Input 
        label={t('labelFirstName')} placeholder={t('placeholderFirstNameRegister')}
        type='text'
        {...register('first_name',{required: t('firstNameRequiredRegister')})}
        error={errors.first_name?.message}
        startWithIcon={<FaRegIdCard  color='#fff' size={'30px'}/>}
      />

      <Input 
        label={t('LabelLastName')} placeholder={t('placeholderLastNameRegister')}
        type='text'
        {...register('last_name',{required: t('lastNameRequiredRegister')})}
        error={errors.last_name?.message}
        startWithIcon={<FaRegIdCard  color='#fff' size={'30px'}/>}
      />


      <SelectRegister 
        label={t('labelRoleRegister')}
        placeholder={t('placeholderRoleRegister')}
        options={[   
            { value: "Student", label: t('selectRoleRegisterStudent') },
            { value: "Instructor", label: t("selectRoleRegisterInstructor") },
          ]}
        {...register('role',{ required: t('roleRequiredRegister') })}
        startWithIcon={ <MdEmail color='#fff' size={'30px'}/>}
        error={errors.role?.message}
      />

    <Input 
        label={t('labelPasswordLogin')} placeholder={t('placeholderPasswordLogin')}
        type='password'
        {...register('password',{required: t('messagePasswordLogin')})}
        error={errors.password?.message}
        startWithIcon={<RiLockPasswordLine  color='#fff' size={'30px'}/>}
      />

     
      <Button  content={t('registerSuccess')} >
          {loading ? <MoonLoaderToButton/> : <IoMdSend/>}
      </Button>

    </form>
  )
}

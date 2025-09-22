'use client';
import Button from '@/components/button/button'
import IconSAuthentication from '@/components/iconSAuthentication/IconSAuthentication';
import Input from '@/components/input/input'
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
      <Input type={'email'} register={register} error={errors} validation={EMAIL_VALIDATION} name='email' label={t('labelEmailRegister')} placeholder={t('placeholderEmailLogin')} >
        <MdEmail color='#fff' size={'30px'}/>
      </Input>


      <Input type={'text'} register={register} error={errors} validation={{ required: t('firstNameRequiredRegister') }} name='first_name' label={t('labelFirstName')} placeholder={t('placeholderFirstNameRegister')} >
        <FaRegIdCard  color='#fff' size={'30px'}/>
      </Input>
      <Input type={'text'} register={register} error={errors} validation={{ required: t('lastNameRequiredRegister') }} name='last_name' label={t('LabelLastName')} placeholder={t('placeholderLastNameRegister')} >
        <FaRegIdCard  color='#fff' size={'30px'}/>
      </Input>

      <SelectBox
            label={t('labelRoleRegister')}
            placeholder={t('placeholderRoleRegister')}
            name="role"
            validation={{ required: t('roleRequiredRegister') }}
            register={register}
            error={errors} 

            options={[   
              { value: "Student", label: t('selectRoleRegisterStudent') },
              { value: "Instructor", label: t("selectRoleRegisterInstructor") },
            ]}
          >
             <MdEmail color='#fff' size={'30px'}/>
          </SelectBox>



      <Input error={errors} register={register} validation={{ required: t('messagePasswordLogin') }} 
          name='password' type={'password'}  label={t('labelPasswordLogin')} placeholder={t('placeholderPasswordLogin')} >
        <RiLockPasswordLine color='#fff' size={'30px'}/>
      </Input>
     
      <Button  content={t('registerSuccess')} >
          {loading ? <MoonLoaderToButton/> : <IoMdSend/>}
      </Button>

    </form>
  )
}

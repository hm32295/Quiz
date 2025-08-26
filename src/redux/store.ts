import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./Features/login";
import forgetPasswordReducer  from './Features/forgetPassword';
import registerReducer  from './Features/register';
import resetPasswordReducer from './Features/resetPassword';
const store =  configureStore({
    reducer: {
      login:loginReducer,
      register: registerReducer,
      forgetPassword: forgetPasswordReducer,
      resetPassword: resetPasswordReducer
    },
  })

export default store;
import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./Features/login";
import forgetPasswordReducer  from './Features/forgetPassword';
import registerReducer  from './Features/register';
import resetPasswordReducer from './Features/resetPassword';
import QuestionReducer from './Features/questionApi';
import  DeleteQuestionReducer from './Features/deleteQuestion';
const store =  configureStore({
    reducer: {
      login:loginReducer,
      register: registerReducer,
      forgetPassword: forgetPasswordReducer,
      resetPassword: resetPasswordReducer,
      Question: QuestionReducer,
      DeleteQuestion: DeleteQuestionReducer
    },
  })

export default store;
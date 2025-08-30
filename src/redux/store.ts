import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./Features/login";
import forgetPasswordReducer  from './Features/forgetPassword';
import registerReducer  from './Features/register';
import resetPasswordReducer from './Features/resetPassword';
import QuestionReducer from './Features/questionApi';
import  DeleteQuestionReducer from './Features/deleteQuestion';
import  editQuestionReducer from './Features/editQuestion';
import  addQuestionReducer from './Features/editQuestion';
import  StudentReducer from './Features/gerStudent';
import QuizzesReducer  from './Features/quizeApi';
const store =  configureStore({
    reducer: {
      login:loginReducer,
      register: registerReducer,
      forgetPassword: forgetPasswordReducer,
      Quizzes:QuizzesReducer,
      resetPassword: resetPasswordReducer,
      Question: QuestionReducer,
      DeleteQuestion: DeleteQuestionReducer,
      editQuestion: editQuestionReducer,
      questionReducer: addQuestionReducer,
      Student: StudentReducer,
    },
  })

export default store;
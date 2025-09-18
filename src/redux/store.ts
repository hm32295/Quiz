import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./Features/login";
import forgetPasswordReducer  from './Features/forgetPassword';
import registerReducer  from './Features/register';
import resetPasswordReducer from './Features/resetPassword';
import QuestionReducer from './Features/questionApi';
import DeleteQuestionReducer from './Features/deleteQuestion';
import editQuestionReducer from './Features/editQuestion';
import addQuestionReducer from './Features/editQuestion';
import StudentReducer from './Features/getStudent';
import getGroupReducer  from './Features/getGroup';
import editGroupReducer  from './Features/editGroup';
import deleteGroupReducer  from './Features/editGroup';
import setGroupReducer  from './Features/setGroup';
import getQuizReducer  from './Features/getQuizzes';
import setQuizReducer from './Features/setQuiz'
import deleteQuizReducer from './Features/deleteQuiz'
import editQuizReducer from './Features/editQuiz'
import firstFiveInCommingReducer from './Features/firstFiveIncommingQuiz'
import lastFiveCompletedQuizReducer from './Features/lastFiveCompletedQuiz'
import createQuizReducer from './Features/createQuiz'
import resultsReducer from './Features/results'
import joinQuizReducer from './Features/joinQuiz'
import singleQuizReducer from './Features/singleQuiz'
import submitQuizReducer from './Features/submitQuiz'
import topStudentReducer from './Features/topStudents'
import singleStudentReducer from './Features/singleStudent'


const store =  configureStore({
    reducer: {
      login:loginReducer,
      createQuiz:createQuizReducer,
      register: registerReducer,
      forgetPassword: forgetPasswordReducer,
      resetPassword: resetPasswordReducer,
      Question: QuestionReducer,
      DeleteQuestion: DeleteQuestionReducer,
      editQuestion: editQuestionReducer,
      questionReducer: addQuestionReducer,
      Student: StudentReducer,
      setGroup:setGroupReducer,
      Group:getGroupReducer,
      editGroup:editGroupReducer,
      deleteGroup:deleteGroupReducer,
      getQuiz:getQuizReducer,
      setQuizSlice:setQuizReducer,
      deleteQuiz:deleteQuizReducer,
      editQuiz:editQuizReducer,
      firstFiveInCommingSlice:firstFiveInCommingReducer,
      lastFiveCompletedQuizSlice:lastFiveCompletedQuizReducer,
      results:resultsReducer,
      joinQuiz : joinQuizReducer,
      singleQuiz : singleQuizReducer,
      submitQuiz : submitQuizReducer,
      topStudent : topStudentReducer,
      singleStudent : singleStudentReducer,
      
    },
  })

export default store;
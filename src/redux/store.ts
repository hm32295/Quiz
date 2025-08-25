import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./Features/login";
const store =  configureStore({
    reducer: {
      login:loginReducer
    },
  })

export default store;
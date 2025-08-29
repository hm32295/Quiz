"use client"
import { axiosInstance } from "@/services/api";
import CookieServices from "@/services/cookies/clientCookie";
import { AUTH_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";
interface LoginPayload {
  data: { email: string; password: string };
  reset: () => void;
  toast: any;
  t: (key: string) => string;
  rout: any;
}


export const loginUser =createAsyncThunk('login/loginUser', async (data:LoginPayload ,{rejectWithValue})=>{
 
     try {
        const response= await axiosInstance.post(AUTH_URL.LOGIN,data.data)
        const dataResponse = response.data.data;
       
       
        setCookie("accessToken", dataResponse.accessToken, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
        setCookie("refreshToken", dataResponse.refreshToken, {
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
        });
        CookieServices.set('profile',JSON.stringify(dataResponse.profile))
        console.log(dataResponse.profile.role === 'Instructor');
        
         if(dataResponse.profile.role === 'Learner'){
             data.rout.push('/learner/dashboard')
         }else if(dataResponse.profile.role === 'Instructor'){
             data.rout.push('/instructor/')
         }
        data.toast.success(data.t('loginSuccess') || 'logged');
        data.reset();
        
        
        return dataResponse
    } catch (error) {
        
        data.toast.error(error?.response?.data?.message || 'error');
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const login = createSlice({
    name:'login',
    initialState: {isLoading: false,error: null as string | null,data: [] as any,value:'login' as string},
    reducers:{
        setLogin:(state)=>{
            state.value = 'login'
        },
        setRegister:(state)=>{
            state.value = 'register'
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default login.reducer
export const { setLogin, setRegister } = login.actions;
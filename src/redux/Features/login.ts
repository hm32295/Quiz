"use client"
import { axiosInstance } from "@/services/api";
import { AUTH_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface LoginPayload { email: string; password: string };



export const loginUser =createAsyncThunk('login/loginUser', async (data:LoginPayload ,{rejectWithValue})=>{
 
     try {
        const response= await axiosInstance.post(AUTH_URL.LOGIN,data)
        
        return response.data
    } catch (error) {
        
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
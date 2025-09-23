
import {  resetPasswordTypes } from "@/interfaces/interfaces";
import { axiosInstance } from "@/services/api";
import { AUTH_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";



export const resetPasswordUser =createAsyncThunk('resetPassword/resetPasswordUser', async (data:resetPasswordTypes ,{rejectWithValue})=>{
        
     try {
        const response= await axiosInstance.post(AUTH_URL.RESET_PASSWORD,data)
       
        return response.data
    } catch (error: unknown) {
          console.error(error);
            let message = "Something went wrong";
    
            if (error instanceof AxiosError) {
              message = error.response?.data?.message || message;
            }
          return rejectWithValue(message);
        }
})

const resetPassword = createSlice({
    name:'resetPassword',
    initialState: {isLoading: false,error: null as string | null,data: []},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(resetPasswordUser.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(resetPasswordUser.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(resetPasswordUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default resetPassword.reducer
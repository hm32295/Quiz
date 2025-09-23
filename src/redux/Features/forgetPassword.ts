
import { ForgetPasswordTypes } from "@/interfaces/interfaces";
import { axiosInstance } from "@/services/api";
import { AUTH_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";



export const forgetPasswordUser =createAsyncThunk('forgetPassword/forgetPasswordUser', async (data:ForgetPasswordTypes ,{rejectWithValue})=>{
        
     try {
        const response= await axiosInstance.post(AUTH_URL.FORGOT_PASSWORD,data)
       
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

const forgetPassword = createSlice({
    name:'forgetPassword',
    initialState: {isLoading: false,error: null as string | null,data: [] },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(forgetPasswordUser.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(forgetPasswordUser.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(forgetPasswordUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default forgetPassword.reducer
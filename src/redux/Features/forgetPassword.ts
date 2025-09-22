
import { RegisterForm } from "@/interfaces/interfaces";
import { axiosInstance } from "@/services/api";
import { AUTH_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const forgetPasswordUser =createAsyncThunk('forgetPassword/forgetPasswordUser', async (data:RegisterForm ,{rejectWithValue})=>{
        
     try {
        const response= await axiosInstance.post(AUTH_URL.FORGOT_PASSWORD,data)
       
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const forgetPassword = createSlice({
    name:'forgetPassword',
    initialState: {isLoading: false,error: null as string | null,data: [] as any},
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
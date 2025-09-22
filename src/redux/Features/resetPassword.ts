
import { RegisterForm } from "@/interfaces/interfaces";
import { axiosInstance } from "@/services/api";
import { AUTH_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const resetPasswordUser =createAsyncThunk('resetPassword/resetPasswordUser', async (data:RegisterForm ,{rejectWithValue})=>{
        
     try {
        const response= await axiosInstance.post(AUTH_URL.RESET_PASSWORD,data)
       
        return response.data
    } catch (error) {
        data.toast.error(error?.response?.data?.message || 'error');
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const resetPassword = createSlice({
    name:'resetPassword',
    initialState: {isLoading: false,error: null as string | null,data: [] as any},
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

import { RegisterForm } from "@/interfaces/interfaces";
import { axiosInstance } from "@/services/api";
import { AUTH_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const registerUser =createAsyncThunk('register/registerUser', async (data:RegisterForm ,{rejectWithValue})=>{
       
        
     try {
        const response= await axiosInstance.post(AUTH_URL.REGISTER,data)    
        
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const register = createSlice({
    name:'register',
    initialState: {isLoading: false,error: null as string | null,data: []},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default register.reducer
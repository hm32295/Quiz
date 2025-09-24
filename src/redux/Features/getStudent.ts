

import { axiosInstance } from "@/services/api";
import {  STUDENT_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


export const StudentAsyncThunk = createAsyncThunk('Student/StudentAsyncThunk', async (_,{rejectWithValue})=>{
        
    
     try {
        const response= await axiosInstance.get(STUDENT_URL.GET_ALL)
        
        const dataResponse = response.data

      
        return dataResponse
    }catch (error: unknown) {
          console.error(error);
            let message = "Something went wrong";
    
            if (error instanceof AxiosError) {
              message = error.response?.data?.message || message;
            }
          return rejectWithValue(message);
        }
})

const Student = createSlice({
    name:'Student',
    initialState: {isLoading: false,error: null as string | null | unknown,data: [] },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(StudentAsyncThunk.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(StudentAsyncThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(StudentAsyncThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default Student.reducer
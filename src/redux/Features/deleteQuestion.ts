

import { axiosInstance } from "@/services/api";
import { QUESTION_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


export const DeleteQuestionAsyncThunk = createAsyncThunk('DeleteQuestion/DeleteQuestionAsyncThunk', async (id:string ,{rejectWithValue})=>{
        
     try {
        const response= await axiosInstance.delete(QUESTION_URL.DELETE(id)) 
        
        return response.data
    }catch (error: unknown) {
          console.error(error);
            let message = "Something went wrong";
    
            if (error instanceof AxiosError) {
              message = error.response?.data?.message || message;
            }
          return rejectWithValue(message);
        }
})

const DeleteQuestion = createSlice({
    name:'DeleteQuestion',
    initialState: {isLoading: false,error: null as string | null | unknown,data: [] },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(DeleteQuestionAsyncThunk.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(DeleteQuestionAsyncThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(DeleteQuestionAsyncThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default DeleteQuestion.reducer
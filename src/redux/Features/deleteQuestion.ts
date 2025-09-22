

import { axiosInstance } from "@/services/api";
import { QUESTION_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const DeleteQuestionAsyncThunk = createAsyncThunk('DeleteQuestion/DeleteQuestionAsyncThunk', async (id:string ,{rejectWithValue})=>{
        
     try {
        const response= await axiosInstance.delete(QUESTION_URL.DELETE(id)) 
        
        return response.data
    } catch (error) {
        console.log(error);
        
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const DeleteQuestion = createSlice({
    name:'DeleteQuestion',
    initialState: {isLoading: false,error: null as string | null,data: [] },
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
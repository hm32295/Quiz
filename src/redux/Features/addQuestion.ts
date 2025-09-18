

import { axiosInstance } from "@/services/api";
import { QUESTION_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface dataAddQuestionType{
    Title: string; Description: string; level: string ;Date:string
}
export const addQuestionAsyncThunk =createAsyncThunk('addQuestion/addQuestionAsyncThunk', async (data,{rejectWithValue})=>{
        
     try {
        const response= await axiosInstance.post(QUESTION_URL.CREATE,data)
       
        return response.data
    } catch (error) {
        console.log(error);
        
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const addQuestion = createSlice({
    name:'addQuestion',
    initialState: {isLoading: false,error: null as string | null,data: [] as any},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addQuestionAsyncThunk.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(addQuestionAsyncThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(addQuestionAsyncThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default addQuestion.reducer
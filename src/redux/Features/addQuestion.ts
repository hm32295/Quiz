

import { axiosInstance } from "@/services/api";
import { QUESTION_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface OptionType {
  A: string;
  B: string;
  C: string;
  D: string;
}

interface DataSingleType {
  _id?: string;
  title?: string;
  description?: string;
  options?: OptionType;
  A?: string;
  B?: string;
  C?: string;
  D?: string;
  answer?: string;
  difficulty?: string;
  type?: string;
}

export const addQuestionAsyncThunk =createAsyncThunk('addQuestion/addQuestionAsyncThunk', async (data:DataSingleType,{rejectWithValue})=>{
        
     try {
        const response= await axiosInstance.post(QUESTION_URL.CREATE,data)
       
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

const addQuestion = createSlice({
    name:'addQuestion',
    initialState: {isLoading: false,error: null as string | null,data: [] },
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
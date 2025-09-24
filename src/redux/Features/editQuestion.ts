

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
interface typeAll {
    dataForm: DataSingleType;
    id:string
}
export const editQuestionAsyncThunk =createAsyncThunk('editQuestion/editQuestionAsyncThunk', async (data:typeAll,{rejectWithValue})=>{
        
     try {
        const response= await axiosInstance.put(QUESTION_URL.UPDATE(data.id) ,data.dataForm)
       
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

const editQuestion = createSlice({
    name:'editQuestion',
    initialState: {isLoading: false,error: null as string | null| unknown,data: []},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(editQuestionAsyncThunk.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(editQuestionAsyncThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(editQuestionAsyncThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default editQuestion.reducer
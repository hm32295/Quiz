

import { axiosInstance } from "@/services/api";
import { QUESTION_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface dataQuestionType{
    Title: string; Description: string; level: string ;Date:string
}
export const QuestionAsyncThunk =createAsyncThunk('Question/QuestionAsyncThunk', async (_,{rejectWithValue})=>{
        
        const data =[]
     try {
        const response= await axiosInstance(QUESTION_URL.GET_ALL)
      
        const dataResponse = response.data
        for (let index = 0; index < dataResponse.length; index++) {
            data.push({Title: dataResponse[index].title,level: dataResponse[index].difficulty,Description: dataResponse[index].description,Points:dataResponse[index].points,data:dataResponse[index] })
        }
        
        
        return data
    } catch (error) {
        console.log(error);
        
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const Question = createSlice({
    name:'Question',
    initialState: {isLoading: false,error: null as string | null,data: [] as any},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(QuestionAsyncThunk.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(QuestionAsyncThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(QuestionAsyncThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default Question.reducer
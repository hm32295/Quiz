

import { axiosInstance } from "@/services/api";
import { QUESTION_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const editQuestionAsyncThunk =createAsyncThunk('editQuestion/editQuestionAsyncThunk', async (data,{rejectWithValue})=>{
        
     try {
        const response= await axiosInstance.put(QUESTION_URL.UPDATE(data.id) ,data.dataForm)
       
        return response.data
    } catch (error) {
        console.log(error);
        
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const editQuestion = createSlice({
    name:'editQuestion',
    initialState: {isLoading: false,error: null as string | null,data: [] as any},
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
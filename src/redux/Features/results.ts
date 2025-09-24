

import { axiosInstance } from "@/services/api";
import { QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


export const resultsAsyncThunk = createAsyncThunk('results/resultsAsyncThunk', async (_,{rejectWithValue})=>{
        
    
     try {
        const response= await axiosInstance.get(QUIZ_URL.RESULT)
       
        const dataResponse = response.data
        
        
        return dataResponse
    } catch (error: unknown) {
            let message = "Something went wrong";
    
            if (error instanceof AxiosError) {
              message = error.response?.data?.message || message;
            }
          return rejectWithValue(message);
        }
})

const results = createSlice({
    name:'results',
    initialState: {isLoading: false,error: null as string | null | unknown,data: []},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(resultsAsyncThunk.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(resultsAsyncThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(resultsAsyncThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default results.reducer
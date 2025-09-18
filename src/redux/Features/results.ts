

import { axiosInstance } from "@/services/api";
import { QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const resultsAsyncThunk = createAsyncThunk('results/resultsAsyncThunk', async (_,{rejectWithValue})=>{
        
    
     try {
        const response= await axiosInstance.get(QUIZ_URL.RESULT)
       
        const dataResponse = response.data
        return dataResponse
    } catch (error) {
        console.log(error);
        
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const results = createSlice({
    name:'results',
    initialState: {isLoading: false,error: null as string | null,data: [] as any},
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
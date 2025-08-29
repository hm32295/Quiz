

import { axiosInstance } from "@/services/api";
import { QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const QuizzesAsyncThunk =createAsyncThunk('changePassword/QuizzesAsyncThunk', async ({rejectWithValue})=>{
        
        
     try {
        const response= await axiosInstance(QUIZ_URL.GET_ALL)
        console.log(response.data);
        
        const dataResponse = response.data.data
        return dataResponse
    } catch (error) {
        console.log(error);
        
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const Quizzes = createSlice({
    name:'Quizzes',
    initialState: {isLoading: false,error: null as string | null,data: [] as any},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(QuizzesAsyncThunk.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(QuizzesAsyncThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(QuizzesAsyncThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default Quizzes.reducer
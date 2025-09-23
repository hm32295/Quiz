import { axiosInstance } from "@/services/api";
import { QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


export const deleteQuizAsyncThunk = createAsyncThunk('deleteQuiz/deleteQuizAsyncThunk', async (id:string ,{rejectWithValue})=>{
        
     try {
        const response= await axiosInstance.delete(QUIZ_URL.DELETE(id))
        console.log(response.data);
        
        
        
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

const deleteQuiz = createSlice({
    name:'deleteQuiz',
    initialState: {isLoading: false,error: null as string | null,data: [] },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(deleteQuizAsyncThunk.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(deleteQuizAsyncThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(deleteQuizAsyncThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default deleteQuiz.reducer
import { axiosInstance } from "@/services/api";
import { QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const deleteQuizAsyncThunk = createAsyncThunk('deleteQuiz/deleteQuizAsyncThunk', async (id ,{rejectWithValue})=>{
        
     try {
        const response= await axiosInstance.delete(QUIZ_URL.DELETE(id))
        console.log(response.data);
        
        
        
        return response.data
    } catch (error) {
        console.log(error);
        
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const deleteQuiz = createSlice({
    name:'deleteQuiz',
    initialState: {isLoading: false,error: null as string | null,data: [] as any},
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
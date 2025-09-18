import { axiosInstance } from "@/services/api";
import { QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getQuizAsyncThunk = createAsyncThunk('getQuiz/getQuizAsyncThunk', async (id ,{rejectWithValue})=>{
        
     try {
        const response= await axiosInstance.get(QUIZ_URL.GET_ALL)
      
        return response.data
    } catch (error) {
        console.log(error);
        
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const getQuiz = createSlice({
    name:'getQuiz',
    initialState: {isLoading: false,error: null as string | null,data: [] as any},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getQuizAsyncThunk.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(getQuizAsyncThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(getQuizAsyncThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default getQuiz.reducer
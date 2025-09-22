
import { axiosInstance } from "@/services/api";
import {  STUDENT_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const studentWithOutGroupAsyncThunk =createAsyncThunk('studentWithOutGroup/studentWithOutGroupAsyncThunk', async (_,{rejectWithValue})=>{
       
     try {
        const response= await axiosInstance.get(STUDENT_URL.GET_ALL_WITHOUT_GROUP)
        const dataResponse = response.data
        console.log(dataResponse);
        
       
        return dataResponse
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const studentWithOutGroup = createSlice({
    name:'studentWithOutGroup',
    initialState: {isLoading: false,error: null as string | null,data: [] as any},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(studentWithOutGroupAsyncThunk.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(studentWithOutGroupAsyncThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(studentWithOutGroupAsyncThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default studentWithOutGroup.reducer
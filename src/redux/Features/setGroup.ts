

import { axiosInstance } from "@/services/api";
import { GROUP_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const SetGroupAsyncThunk = createAsyncThunk('setGroup/SetGroupAsyncThunk', async (data,{rejectWithValue})=>{
        
    
    
     try {
        const response= await axiosInstance.post(GROUP_URL.CREATE,data)
        
    
        const dataResponse = response.data
        
        return dataResponse
    } catch (error) {
        console.log(error);
        
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const setGroup = createSlice({
    name:'setGroup',
    initialState: {isLoading: false,error: null as string | null,data: [] as any},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(SetGroupAsyncThunk.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(SetGroupAsyncThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(SetGroupAsyncThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default setGroup.reducer
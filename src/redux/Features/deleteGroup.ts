

import { axiosInstance } from "@/services/api";
import { GROUP_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// interface typeProps {
//     id: string
// }
export const deleteGroupAsyncThunk = createAsyncThunk('deleteGroup/deleteGroupAsyncThunk', async (id:string,{rejectWithValue})=>{
        
    
    
     try {
        const response= await axiosInstance.delete(GROUP_URL.DELETE(id))
        
        const dataResponse = response.data
        
        return dataResponse
    } catch (error) {
        console.log(error);
        
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const deleteGroup = createSlice({
    name:'deleteGroup',
    initialState: {isLoading: false,error: null as string | null,data: [] },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(deleteGroupAsyncThunk.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(deleteGroupAsyncThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(deleteGroupAsyncThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default deleteGroup.reducer
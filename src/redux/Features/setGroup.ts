

import { axiosInstance } from "@/services/api";
import { GROUP_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
interface GroupForm {
  name: string;
  students: string[];
  _id?: string;
}


export const SetGroupAsyncThunk = createAsyncThunk('setGroup/SetGroupAsyncThunk', async (data:GroupForm,{rejectWithValue})=>{
        
    
    
     try {
        const response= await axiosInstance.post(GROUP_URL.CREATE,data)
        
    
        const dataResponse = response.data
        
        return dataResponse
    }catch (error: unknown) {
          console.error(error);
            let message = "Something went wrong";
    
            if (error instanceof AxiosError) {
              message = error.response?.data?.message || message;
            }
          return rejectWithValue(message);
        }
})

const setGroup = createSlice({
    name:'setGroup',
    initialState: {isLoading: false,error: null as string | null | unknown,data: [] },
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
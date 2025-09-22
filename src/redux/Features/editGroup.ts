

import { axiosInstance } from "@/services/api";
import { GROUP_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface GroupForm {
  name: string;
  students: string[];
}
interface typeAll{
    data:GroupForm;
    id:string
}
export const editGroupAsyncThunk = createAsyncThunk('editGroup/editGroupAsyncThunk', async (data:typeAll,{rejectWithValue})=>{
        
     try {
        const response= await axiosInstance.put(GROUP_URL.UPDATE(data.id),data.data)
        const dataResponse = response.data
        
        return dataResponse
    } catch (error) {
        console.log(error);
        
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const editGroup = createSlice({
    name:'editGroup',
    initialState: {isLoading: false,error: null as string | null,data: []},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(editGroupAsyncThunk.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(editGroupAsyncThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(editGroupAsyncThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default editGroup.reducer
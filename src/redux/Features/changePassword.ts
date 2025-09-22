
import { changePasswordTypes } from "@/interfaces/interfaces";
import { axiosInstance } from "@/services/api";
import { AUTH_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const changePasswordUser =createAsyncThunk('changePassword/changePasswordUser', async (data:changePasswordTypes ,{rejectWithValue})=>{
       
     try {
        const response= await axiosInstance.post(AUTH_URL.CHANGE_PASSWORD,data)
       
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
        
      }
})

const changePassword = createSlice({
    name:'changePassword',
    initialState: {isLoading: false,error: null as string | null,data: [] as any},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(changePasswordUser.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(changePasswordUser.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(changePasswordUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }

})
export default changePassword.reducer
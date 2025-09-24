
import { changePasswordTypes } from "@/interfaces/interfaces";
import { axiosInstance } from "@/services/api";
import { AUTH_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
interface ChangePasswordResponse {
  message?: string;
  success?: boolean;
}
interface ChangePasswordState {
  isLoading: boolean;
  error: string | null | unknown;
  data: ChangePasswordResponse | null;
}

const initialState: ChangePasswordState = {
  isLoading: false,
  error: null,
  data: null
}


export const changePasswordUser = createAsyncThunk<
  ChangePasswordResponse, 
  changePasswordTypes,    
  { rejectValue: { message: string } } 
>('changePassword/changePasswordUser', async (data:changePasswordTypes ,{rejectWithValue})=>{
       
     try {
        const response= await axiosInstance.post(AUTH_URL.CHANGE_PASSWORD,data)
       
        return response.data
    }catch (error: unknown) {
            let message = "Something went wrong";
    
            if (error instanceof AxiosError) {
              message = error.response?.data?.message || message;
            }
          return rejectWithValue({message});
        }
})

const changePassword = createSlice({
    name:'changePassword',
    initialState,
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
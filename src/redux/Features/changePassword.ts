
import { RegisterForm } from "@/interfaces/interfaces";
import { axiosInstance } from "@/services/api";
import { AUTH_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface LoginPayload {
  data: RegisterForm
  reset: () => void;
  toast: any;
  t: (key: string) => string;
}

export const changePasswordUser =createAsyncThunk('changePassword/changePasswordUser', async (data:LoginPayload ,{rejectWithValue})=>{
       
     try {
        const response= await axiosInstance.post(AUTH_URL.CHANGE_PASSWORD,data.data)
        const dataResponse = response.data.data
        data.reset()
        data.toast.success(data.t('toastSuccessRegister') || 'Register Success');
      
        return dataResponse
    } catch (error) {
        console.log(error);
        
        data.toast.error(error?.response?.data?.message || 'error');
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
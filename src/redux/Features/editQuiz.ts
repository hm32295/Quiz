import { axiosInstance } from "@/services/api";
import { QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface editQuizState {
  isLoading: boolean;
  error: string | null;
  data: any[];
}

const initialState: editQuizState = {
  isLoading: false,
  error: null,
  data: [],
};

export const editQuizAsyncThunk = createAsyncThunk( "editQuiz/editQuizAsyncThunk",async (data, { rejectWithValue }) => {
 
    try {
      const response = await axiosInstance.put(QUIZ_URL.UPDATE(data.id),data.data);
    console.log(response.data);
    
      return response.data;
      
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);

const editQuizSlice = createSlice({
  name: "editQuiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editQuizAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editQuizAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(editQuizAsyncThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default editQuizSlice.reducer;

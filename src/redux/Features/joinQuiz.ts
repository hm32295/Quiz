import { axiosInstance } from "@/services/api";
import { QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface JoinQuizResponse {
  _id: string;
  title: string;
  code: string;
  description?: string;
  duration?: number;
  questions_number?: number;
 
}

interface JoinQuizState {
  isLoading: boolean;
  error: string | null;
  data: JoinQuizResponse[];
  
  
}

interface TypeSubmit {
  code: string;
  
}

const initialState: JoinQuizState = {
  isLoading: false,
  error: null,
  data: [],
};

export const joinQuizAsyncThunk = createAsyncThunk<
  JoinQuizResponse[], 
  TypeSubmit,      
  { rejectValue: string } 
>(
  "joinQuiz/joinQuizAsyncThunk",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(QUIZ_URL.JOIN, data);
      return response.data as JoinQuizResponse[];
    } catch (error: unknown) {
          console.error(error);
            let message = "Something went wrong";
    
            if (error instanceof AxiosError) {
              message = error.response?.data?.message || message;
            }
          return rejectWithValue(message);
        }
  }
);

const joinQuizSlice = createSlice({
  name: "joinQuiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(joinQuizAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(joinQuizAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(joinQuizAsyncThunk.fulfilled, (state, action: PayloadAction<JoinQuizResponse[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default joinQuizSlice.reducer;

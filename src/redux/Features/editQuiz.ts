import { axiosInstance } from "@/services/api";
import { QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface EditQuizState {
  isLoading: boolean;
  error: string | null;
  data: QuizResponse | null;
}

interface QuizResponse {
  _id: string;
  title: string;
  difficulty?: string;
  schedule?: string;
}

const initialState: EditQuizState = {
  isLoading: false,
  error: null,
  data: null,
};

interface EditQuizPayload {
  id: string;
  data: { title: string };
}

export const editQuizAsyncThunk = createAsyncThunk<
  QuizResponse, 
  EditQuizPayload,
  { rejectValue: string } 
>(
  "editQuiz/editQuizAsyncThunk",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(QUIZ_URL.UPDATE(id), data);
      return response.data as QuizResponse;
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
        state.error = action.payload || "Something went wrong";
      })
      .addCase(editQuizAsyncThunk.fulfilled, (state, action: PayloadAction<QuizResponse>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default editQuizSlice.reducer;

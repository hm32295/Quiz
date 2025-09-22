import { axiosInstance } from "@/services/api";
import { QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: string[];
  difficulty: string;
  schadule: string;
  group?: string;
  type?: string;
  duration?: string;
  score_per_question?: string;
}

interface SingleQuizState {
  isLoading: boolean;
  error: string | null;
  data: Quiz | null;
}

const initialState: SingleQuizState = {
  isLoading: false,
  error: null,
  data: null,
};

export const singleQuizAsyncThunk = createAsyncThunk<Quiz, string, { rejectValue: string }>(
  "singleQuiz/singleQuizAsyncThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(QUIZ_URL.WITHOUT_ANSWERS(id));
      return response.data as Quiz;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);

const singleQuizSlice = createSlice({
  name: "singleQuiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(singleQuizAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(singleQuizAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(singleQuizAsyncThunk.fulfilled, (state, action: PayloadAction<Quiz>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default singleQuizSlice.reducer;

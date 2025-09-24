import { axiosInstance } from "@/services/api";
import { QUESTION_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface OptionType {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}

export interface QuestionAPIResponse {
  _id: string;
  title: string;
  description: string;
  options: OptionType;
  answer: string;
  status: string;
  instructor: string;
  difficulty: string;
  points: number;
  type: string;
}

export interface QuestionItem {
  Title: string;
  level: string;
  Description: string;
  Points: number;
  data: QuestionAPIResponse;
}

export interface QuestionState {
  isLoading: boolean;
  error: string | null;
  data: QuestionItem[];
}

const initialState: QuestionState = {
  isLoading: false,
  error: null,
  data: []
};

interface RejectValue {
  message: string;
}

// Async thunk
export const QuestionAsyncThunk = createAsyncThunk<
  QuestionItem[],   
  void,  
  { rejectValue: RejectValue }
>(
  'Question/QuestionAsyncThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<QuestionAPIResponse[]>(QUESTION_URL.GET_ALL);
      const dataResponse = response.data;
      
      const data: QuestionItem[] = dataResponse.map((q) => ({
        Title: q.title,
        level: q.difficulty,
        Description: q.description,
        Points: q.points,
        data: q
      }));

      return data;
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (error instanceof AxiosError) {
        message = error.response?.data?.message || message;
      }
      return rejectWithValue({ message });
    }
  }
);

// Slice
const Question = createSlice({
  name: 'Question',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(QuestionAsyncThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(QuestionAsyncThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message || "Unknown error";
    });
    builder.addCase(QuestionAsyncThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  }
});

export default Question.reducer;

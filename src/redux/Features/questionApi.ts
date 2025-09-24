import { axiosInstance } from "@/services/api";
import { QUESTION_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// نوع الخيارات داخل كل سؤال
interface OptionType {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}

// شكل كل سؤال من الـ API
interface QuestionAPIResponse {
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

// نوع كل عنصر في الـ state بعد المعالجة
interface QuestionItem {
  Title: string;
  level: string;
  Description: string;
  Points: number;
  data: QuestionAPIResponse;
}

// نوع الـ state
interface QuestionState {
  isLoading: boolean;
  error: string | null;
  data: QuestionItem[];
}

// initial state
const initialState: QuestionState = {
  isLoading: false,
  error: null,
  data: []
};

// النوع اللي هنبعثه عند reject
interface RejectValue {
  message: string;
}

// Async thunk
export const QuestionAsyncThunk = createAsyncThunk<
  QuestionItem[],       // النوع اللي بيرجع عند fulfilled
  void,                 // النوع اللي بيستقبل كـ argument
  { rejectValue: RejectValue } // النوع اللي بيرجع عند rejected
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

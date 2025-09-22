import { axiosInstance } from "@/services/api";
import { QUIZ_URL, setQuiz_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface setQuizState {
  isLoading: boolean;
  error: string | null;
  data: any[];
}

const initialState: setQuizState = {
  isLoading: false,
  error: null,
  data: [],
};

export const setQuizAsyncThunk = createAsyncThunk(
  "setQuiz/setQuizAsyncThunk",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(QUIZ_URL.CREATE,data);
      // console.log(response.data);
      
     return response.data;
      
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);

const setQuizSlice = createSlice({
  name: "setQuiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setQuizAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setQuizAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(setQuizAsyncThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default setQuizSlice.reducer;

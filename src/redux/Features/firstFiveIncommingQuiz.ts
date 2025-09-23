import { axiosInstance } from "@/services/api";
import { QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type IncomingQuiz = {
  title: string;
  schadule: string;
  participants: number;
  image: string;
  status?: string;
  _id?: string;
};


interface FirstFiveIncomingState {
  isLoading: boolean;
  error: string | null;
  data: IncomingQuiz[];
}

const initialState: FirstFiveIncomingState = {
  isLoading: false,
  error: null,
  data: [],
};


export const firstFiveInCommingAsyncThunk = createAsyncThunk<
  IncomingQuiz[], 
  void,         
  { rejectValue: string } 
>(
  "firstFiveInComing/firstFiveInComingAsyncThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(QUIZ_URL.INCOMING);
      return response.data as IncomingQuiz[];
    } catch (error: unknown) {
        let message = "Something went wrong";

        if (error instanceof AxiosError) {
          message = error.response?.data?.message || message;
        }
      return rejectWithValue(message);
    }
  }
);

const firstFiveInComingSlice = createSlice({
  name: "firstFiveInComming",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(firstFiveInCommingAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(firstFiveInCommingAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(
        firstFiveInCommingAsyncThunk.fulfilled,
        (state, action: PayloadAction<IncomingQuiz[]>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      );
  },
});

export default firstFiveInComingSlice.reducer;

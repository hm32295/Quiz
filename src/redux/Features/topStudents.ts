import { axiosInstance } from "@/services/api";
import { STUDENT_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface TopStudent {
  _id: string;
  name: string;
  score: number;
  avatar?: string;
  
}

interface TopStudentSliceState {
  isLoading: boolean;
  error: string | null;
  data: TopStudent[];
}

const initialState: TopStudentSliceState = {
  isLoading: false,
  error: null,
  data: [],
};

export const topStudentAsyncThunk = createAsyncThunk<
  TopStudent[], // نوع الـ return
  void,        // نوع الـ argument
  { rejectValue: string }
>(
  "topStudent/topStudentAsyncThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(STUDENT_URL.TOP_FIVE);
      return response.data as TopStudent[];
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);

const topStudentSlice = createSlice({
  name: "topStudent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topStudentAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(topStudentAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(topStudentAsyncThunk.fulfilled, (state, action: PayloadAction<TopStudent[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default topStudentSlice.reducer;

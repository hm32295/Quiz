import { axiosInstance } from "@/services/api";
import { STUDENT_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface Student {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  
}

interface SingleStudentState {
  isLoading: boolean;
  error: string | null;
  data: Student | null;
}

const initialState: SingleStudentState = {
  isLoading: false,
  error: null,
  data: null,
};

export const singleStudentAsyncThunk = createAsyncThunk<
  Student,
  string,
  { rejectValue: string }
>(
  "singleStudent/singleStudentAsyncThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(STUDENT_URL.GET_BY_ID(id));
      return response.data as Student;
    }catch (error: unknown) {
          console.error(error);
            let message = "Something went wrong";
    
            if (error instanceof AxiosError) {
              message = error.response?.data?.message || message;
            }
          return rejectWithValue(message);
        }
  }
);

const singleStudentSlice = createSlice({
  name: "singleStudent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(singleStudentAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(singleStudentAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(singleStudentAsyncThunk.fulfilled, (state, action: PayloadAction<Student>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default singleStudentSlice.reducer;

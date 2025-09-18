import { axiosInstance } from "@/services/api";
import { singleStudent_URL, STUDENT_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface singleStudentState {
  isLoading: boolean;
  error: string | null;
  data: any[];
}

const initialState: singleStudentState = {
  isLoading: false,
  error: null,
  data: [],
};

export const singleStudentAsyncThunk = createAsyncThunk(
  "singleStudent/singleStudentAsyncThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(STUDENT_URL.GET_BY_ID(id));
      
      return response.data;
      
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
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
        state.error = action.payload as string;
      })
      .addCase(singleStudentAsyncThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default singleStudentSlice.reducer;

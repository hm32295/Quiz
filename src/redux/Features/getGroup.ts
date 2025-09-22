import { axiosInstance } from "@/services/api";
import { GROUP_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Group {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface GroupState {
  isLoading: boolean;
  error: string | null;
  data: Group[];
}

const initialState: GroupState = {
  isLoading: false,
  error: null,
  data: [],
};

export const groupAsyncThunk = createAsyncThunk<
  Group[], 
  void,   
  { rejectValue: string } 
>(
  "group/groupAsyncThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(GROUP_URL.GET_ALL);
      return response.data as Group[];
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(groupAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(groupAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(
        groupAsyncThunk.fulfilled,
        (state, action: PayloadAction<Group[]>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      );
  },
});

export default groupSlice.reducer;

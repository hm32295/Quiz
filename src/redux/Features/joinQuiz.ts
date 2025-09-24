"use client";

import { axiosInstance } from "@/services/api";
import { QUIZ_URL } from "@/services/endpoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface JoinQuizData {
  quiz: string;
  participant: string;
  score: number;
  started_at: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

interface JoinQuizPayload {
  data: JoinQuizData;
  message: string;
}

interface JoinQuizState {
  isLoading: boolean;
  error: string | null;
  data: JoinQuizData | null;
}

interface TypeSubmit {
  code: string;
}

const initialState: JoinQuizState = {
  isLoading: false,
  error: null,
  data: null,
};

export const joinQuizAsyncThunk = createAsyncThunk<
  JoinQuizPayload,
  TypeSubmit,
  { rejectValue: string }
>(
  "joinQuiz/joinQuizAsyncThunk",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(QUIZ_URL.JOIN, data);
      return response.data as JoinQuizPayload;
    } catch (error) {
      let message = "Something went wrong";
      if (error instanceof AxiosError) {
        message = error.response?.data?.message || message;
      }
      return rejectWithValue(message);
    }
  }
);

const joinQuizSlice = createSlice({
  name: "joinQuiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(joinQuizAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(joinQuizAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(joinQuizAsyncThunk.fulfilled, (state, action: PayloadAction<JoinQuizPayload>) => {
        state.isLoading = false;
        state.data = action.payload.data;
      });
  },
});

export default joinQuizSlice.reducer;

/*
 * @Date: 2024-01-22 10:48:48
 * @Description: description
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getDemoData = createAsyncThunk("demo/getData", async (initData: string) => {
  const res = await axios.post("http://127.0.0.1:3000/api/getDemoData", {
    content: initData,
  });
  return res.data?.data?.content;
});

const demoReducer = createSlice({
  name: "demo1",
  initialState: typeof window !== 'undefined' ? (window as any)?.context?.state?.demo : { content: '默认数据' },
  // 同步reducer
  reducers: {},
  // 异步reducer
  extraReducers(build) {
    build
      .addCase(getDemoData.pending, (state) => {
        state.content = "pending";
      })
      .addCase(getDemoData.fulfilled, (state, action) => {
        state.content = action.payload;
      })
      .addCase(getDemoData.rejected, (state) => {
        state.content = "rejected";
      });
  },
});

export { demoReducer, getDemoData };

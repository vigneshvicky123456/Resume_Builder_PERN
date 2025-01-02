import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const accountUser = createAsyncThunk("auth/accountUser", async (userDetails) => {
  console.log('ASYNC userDetails',userDetails);
  
  const response = await axios.post("http://localhost:5000/accountUser/register",userDetails);
  return response.data;
});


export const getAccountUser = createAsyncThunk("auth/getAccountUser", async () => {
  const response = await axios.get("http://localhost:5000/accountUser/me");
  console.log('ASYNC userDetails',response.data);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userDetails: {},
    userData:[],
    status: null,
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(accountUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(accountUser.fulfilled, (state, action) => {
        state.userDetails.push(action.payload);
        state.status = "success";
        console.log("slice user", state.userDetails);
      })
      .addCase(accountUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getAccountUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        console.log("slice getAccountUser", state.userData);
      });

  },
});


export default authSlice.reducer;


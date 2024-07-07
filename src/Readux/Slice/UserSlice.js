import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios";

export const SignUp = createAsyncThunk(
  'user/signUp',
  async ({ name, email, password }, { rejecteWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/auth/createuser`, {
        name: name,
        email: email,
        password: password
      });
      return response?.data;
    } catch (error) {
      return rejecteWithValue(error?.response?.data);
    }
  }
);
export const verifyUser = createAsyncThunk(
  async ({ otp, id }, { rejecteWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/auth/verifyuser/${id}`, {
        otp: otp
      });
      return response?.data;
    } catch (error) {
      return rejecteWithValue(error?.response?.data);
    }
  }
);
export const logIn = createAsyncThunk(
  'user/logIn',
  async ({ email, password }, { rejecteWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/auth/login`, {
        email: email,
        password: password,
      });
      console.log("this is response->", response);
      return response?.data;
    } catch (error) {
      return rejecteWithValue(error?.response?.data);
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: null,
    error: null,
    accessToken: null,
    refreshToken: null,
    UserId: null,
  },

  setTokens(state, action) {
    state.accessToken = action?.payload?.accessToken;

    state.refreshToken = action?.payload?.refreshToken;
  },
  extraReducers: (builders) => {
    builders.addCase(logIn.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action?.payload?.data?.user;
        state.accessToken = action?.payload?.data?.accessToken;
        state.refreshToken = action?.payload?.data?.refreshToken;
        console.log("loggin action here", action?.payload?.data?.user);
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(SignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.UserId = action?.payload?.data?.user?._id;
      })
      .addCase(SignUp.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyUser.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
  },
});



export default userSlice.reducer;
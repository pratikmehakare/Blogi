import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (state, action) => action.payload,
    logout: () => null,

  },
});

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;

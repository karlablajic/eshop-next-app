import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  userData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
      state.isAdmin = action.payload.isAdmin;
    },
    removeUser: (state) => {
      state.userData = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
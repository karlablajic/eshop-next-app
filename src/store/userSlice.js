import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

const initialState = {
  token: null,
  isLoggedIn: false,
  isAdmin: false,
  userData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, user } = action.payload;
      state.userData = user;
      state.isLoggedIn = true;
      state.token = token;
      state.isAdmin = user.isAdmin;
    },
    removeUser: (state) => {
      state.userData = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.token = null;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUser, removeUser, setUserData } = userSlice.actions;

export default userSlice.reducer;

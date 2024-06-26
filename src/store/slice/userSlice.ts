import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';

export interface userDataProps {
  email: string | null;
  uid: string | null;
}

export interface userStateProps {
  userData: userDataProps | null;
  pending: boolean;
  isAuth: boolean;
}

const initialState: userStateProps = {
  userData: null,
  pending: true,
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.userData = payload;
      state.isAuth = true;
      state.pending = false;
    },
    setUnAuth: (state) => {
      state.userData = null;
      state.isAuth = false;
      state.pending = false;
    },
  },
});

export const { setUser, setUnAuth } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

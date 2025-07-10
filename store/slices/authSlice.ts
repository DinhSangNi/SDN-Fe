import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  id: string | null;
  fullName?: string | null;
  email: string | null;
  avatar: string | null;
  role: string | null;
};

const initialState: UserState = {
  id: null,
  fullName: null,
  email: null,
  avatar: null,
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user: {
          id: string;
          fullName?: string;
          email: string;
          avatar: string;
          role: string;
        };
        accessToken: string;
      }>
    ) => {
      state.id = action.payload.user.id;
      state.fullName = action.payload.user.fullName;
      state.email = action.payload.user.email;
      state.avatar = action.payload.user.avatar;
      state.role = action.payload.user.role;
      localStorage.setItem('user', JSON.stringify(state));
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    logout: (state) => {
      state.id = null;
      state.fullName = null;
      state.email = null;
      state.avatar = null;
      state.role = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

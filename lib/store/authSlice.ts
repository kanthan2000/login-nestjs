import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  username: string;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  username: '',
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username;
      state.isAuthenticated = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.username = '';
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { login, setError, logout } = authSlice.actions;
export default authSlice.reducer;
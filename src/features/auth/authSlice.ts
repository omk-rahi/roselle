import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User } from "./types";
import { getAuthSession } from "./session";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  sessionExpiresAt: number | null;
}

const activeSession = getAuthSession();

const initialState: AuthState = {
  user: activeSession?.user ?? null,
  isAuthenticated: !!activeSession?.user,
  sessionExpiresAt: activeSession?.expiresAt ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    setSessionExpiresAt: (state, action: PayloadAction<number | null>) => {
      state.sessionExpiresAt = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.sessionExpiresAt = null;
    },
  },
});

export const { setUser, setSessionExpiresAt, logout } = authSlice.actions;

export default authSlice.reducer;

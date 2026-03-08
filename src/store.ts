import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import authReducer, {
  logout,
  setSessionExpiresAt,
  setUser,
} from "@/features/auth/authSlice";
import { clearAuthSession, createAuthSession } from "@/features/auth/session";
import cartReducer, { clearCartState } from "@/features/cart/cartSlice";
import { clearCart } from "@/features/cart/api";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const authSessionListener = createListenerMiddleware();

authSessionListener.startListening({
  actionCreator: setUser,
  effect: async (action, listenerApi) => {
    if (!action.payload) {
      clearAuthSession();
      listenerApi.dispatch(setSessionExpiresAt(null));
      return;
    }

    const session = createAuthSession(action.payload);
    listenerApi.dispatch(setSessionExpiresAt(session?.expiresAt ?? null));
  },
});

authSessionListener.startListening({
  actionCreator: logout,
  effect: async (_, listenerApi) => {
    clearAuthSession();
    await clearCart();
    listenerApi.dispatch(clearCartState());
    listenerApi.dispatch(setSessionExpiresAt(null));
  },
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(authSessionListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

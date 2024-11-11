import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./slices/wallet";
export const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
});

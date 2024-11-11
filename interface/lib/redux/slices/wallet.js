import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  address: "",
  points: 0,
};

export const walletSlice = createSlice({
  name: "wallet",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setWalletAddress: (state, action) => {
      state.address = action.payload;
    },

    setPoints: (state, action) => {
      state.points = action.payload;
    },
  },
});

export const { setWalletAddress, setPoints } = walletSlice.actions;

const walletReducer = walletSlice.reducer;
export default walletReducer;

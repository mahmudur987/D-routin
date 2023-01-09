import { createSlice } from "@reduxjs/toolkit";

export const CounterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 5,
  },

  reducers: {
    increament: (state) => {
      state.value = state.value + 1;
    },
    decreament: (state) => {
      state.value = state.value - 1;
    },
  },
});

export const { increament, decreament } = CounterSlice.actions;
export default CounterSlice.reducer;

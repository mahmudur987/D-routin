import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "../State/Counter/CounterSlice";

export default configureStore({
  reducer: {
    counter: CounterSlice,
  },
});

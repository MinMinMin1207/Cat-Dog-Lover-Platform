import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import blogSlice from "./blogSlice";

export default configureStore({
  reducer: {
    cart: cartSlice,
    blog: blogSlice,
  },
});

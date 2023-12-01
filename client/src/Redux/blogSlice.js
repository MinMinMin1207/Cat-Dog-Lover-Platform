import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  image: "",
  content: "",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addToBlog(state, action) {
      state.name = action.name;
      state.image = action.image;
      state.content = action.content;
    },
  },
});

export const { addToBlog } = blogSlice.actions;

export default blogSlice.reducer;

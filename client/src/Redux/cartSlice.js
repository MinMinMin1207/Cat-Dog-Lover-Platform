import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
  cartCheckOut: [],
  cartCheckOutTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      let cart = action.payload;
      // Find index user in list
      let index = state.cartItem.findIndex(
        (item) => item.user.userId === cart.user.userId
      );
      // If have user in list
      if (index >= 0) {
        // Find product in list of user
        let indexProduct = state.cartItem[index].data.findIndex(
          (item) => item.id === cart.data.id
        );
        // If have product will increase quantity
        if (indexProduct >= 0) {
          state.cartItem[index].data[indexProduct].quantity +=
            cart.data.quantity;
        } else {
          state.cartItem[index].data.push(cart.data);
        }
      } else {
        state.cartItem.push({
          user: cart.user,
          data: [cart.data],
        });
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    saveToCart(state, action) {
      // state.cartTotalAmount = action.payload.totalCart;
      localStorage.setItem("cartItem", JSON.stringify(action.payload.listCart));
      state.cartItem = action.payload.listCart;
    },
    addCartCheckOut(state, action) {
      let listCart = action.payload;
      state.cartCheckOut = listCart;
      // state.cartCheckOutTotal = state.cartCheckOut.reduce(
      //   (total, currentValue) =>
      //     (total += currentValue.data.price * currentValue.data.quantity),
      //   0
      // );
      // console.log(state.cartCheckOutTotal);
    },
    removeAllCart(state) {
      state.cartItem = [];
    },
  },
});

export const { addToCart } = cartSlice.actions;
export const { saveToCart } = cartSlice.actions;
export const { addCartCheckOut } = cartSlice.actions;
export const { removeAllCart } = cartSlice.actions;

export default cartSlice.reducer;

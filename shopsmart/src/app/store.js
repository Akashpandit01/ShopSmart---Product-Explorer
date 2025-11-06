import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../products/productSlice";
import cartReducer from "../cart/cartSlice";
import { loadCart, saveCart } from "../utils/storage";

const preloadedState = {
  cart: loadCart(),
};

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveCart(store.getState().cart);
});

export default store;

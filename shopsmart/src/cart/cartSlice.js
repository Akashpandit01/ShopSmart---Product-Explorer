import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const id = product.id;
      if (state.items[id]) state.items[id].qty += 1;
      else state.items[id] = { product, qty: 1 };
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      if (!state.items[id]) return;
      state.items[id].qty -= 1;
      if (state.items[id].qty <= 0) delete state.items[id];
    },
    removeFromCart: (state, action) => {
      delete state.items[action.payload];
    },
    setQty: (state, action) => {
      const { id, qty } = action.payload;
      if (qty <= 0) delete state.items[id];
      else state.items[id].qty = qty;
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const {
  addToCart,
  decreaseQty,
  removeFromCart,
  setQty,
  clearCart,
} = cartSlice.actions;

export const selectCartItemsArray = (state) => Object.values(state.cart.items);

export const selectTotals = createSelector([selectCartItemsArray], (items) => {
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.product.price, 0);
  return { totalItems, totalPrice };
});

export default cartSlice.reducer;

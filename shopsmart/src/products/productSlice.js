import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filtered: [],
    categories: [],
    search: "",
    category: "All",
    minPrice: 0,
    maxPrice: 1000,
    status: "idle",
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setPriceRange(state, action) {
      const { min, max } = action.payload;
      state.minPrice = min;
      state.maxPrice = max;
    },
    clearFilters(state) {
      state.search = "";
      state.category = "All";
      state.minPrice = 0;
      state.maxPrice = 1000;
    },
    filterProducts(state) {
      let filtered = state.items.filter((p) => {
        const matchCategory =
          state.category === "All" || p.category === state.category;
        const matchSearch = p.title
          .toLowerCase()
          .includes(state.search.toLowerCase());
        const matchPrice = p.price >= state.minPrice && p.price <= state.maxPrice;
        return matchCategory && matchSearch && matchPrice;
      });
      state.filtered = filtered;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filtered = action.payload;
        state.categories = ["All", ...new Set(action.payload.map((p) => p.category))];
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setSearch, setCategory, setPriceRange, clearFilters, filterProducts } =
  productSlice.actions;
export default productSlice.reducer;

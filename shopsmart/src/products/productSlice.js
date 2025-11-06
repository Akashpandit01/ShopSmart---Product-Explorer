import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

const API_URL = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch(API_URL);
  return res.json();
});

const initialState = {
  items: [],
  status: "idle",
  error: null,
  search: "",
  category: "all",
  priceRange: [0, 1000],
  page: 1,
  pageSize: 8,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearFilters: (state) => {
      state.search = "";
      state.category = "all";
      state.page = 1;
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
        const maxPrice = Math.ceil(Math.max(...state.items.map((p) => p.price)));
        state.priceRange = [0, maxPrice];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setSearch,
  setCategory,
  setPriceRange,
  setPage,
  clearFilters,
} = productSlice.actions;

export const selectCategories = createSelector(
  [(state) => state.products.items],
  (items) => ["all", ...new Set(items.map((p) => p.category))]
);

export const selectFiltered = createSelector(
  [(state) => state.products],
  ({ items, search, category, priceRange }) => {
    const [min, max] = priceRange;
    return items.filter((p) => {
      const inCategory = category === "all" || p.category === category;
      const inPrice = p.price >= min && p.price <= max;
      const inSearch = p.title.toLowerCase().includes(search.toLowerCase());
      return inCategory && inPrice && inSearch;
    });
  }
);

export const selectPaged = createSelector(
  [selectFiltered, (state) => state.products.page, (state) => state.products.pageSize],
  (filtered, page, pageSize) => {
    const start = (page - 1) * pageSize;
    return {
      total: filtered.length,
      items: filtered.slice(start, start + pageSize),
    };
  }
);

export default productSlice.reducer;

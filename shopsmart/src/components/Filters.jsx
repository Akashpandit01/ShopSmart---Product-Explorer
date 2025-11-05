import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  setCategory,
  setPriceRange,
  clearFilters,
  filterProducts,
} from "../features/products/productSlice";

export default function Filters() {
  const dispatch = useDispatch();
  const { categories, search, category, minPrice, maxPrice } = useSelector(
    (state) => state.products
  );

  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      dispatch(setSearch(value));
      dispatch(filterProducts());
    }, 500);
    setDebounceTimer(timer);
  };

  useEffect(() => {
    dispatch(filterProducts());
  }, [category, minPrice, maxPrice]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        defaultValue={search}
        onChange={handleSearch}
      />

      <select
        value={category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
      >
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Min"
        value={minPrice}
        onChange={(e) =>
          dispatch(setPriceRange({ min: +e.target.value, max: maxPrice }))
        }
      />
      <input
        type="number"
        placeholder="Max"
        value={maxPrice}
        onChange={(e) =>
          dispatch(setPriceRange({ min: minPrice, max: +e.target.value }))
        }
      />

      <button onClick={() => dispatch(clearFilters())}>Clear Filters</button>
    </div>
  );
}

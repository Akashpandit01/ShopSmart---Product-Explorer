import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectTotals } from "../cart/cartSlice";
import useDebouncedValue from "../hooks/useDebouncedValue";
import { useState, useEffect } from "react";
import { setSearch } from "../products/productSlice";


export default function Header() {
  const dispatch = useDispatch();
  const { totalItems } = useSelector(selectTotals);
  const location = useLocation();
  const [search, setSearchText] = useState("");
  const debounced = useDebouncedValue(search, 500);

  useEffect(() => {
    if (location.pathname === "/") dispatch(setSearch(debounced));
  }, [debounced, dispatch, location.pathname]);

  return (
    <header className="header">
      <Link to="/" className="logo">
        ShopSmart
      </Link>
      {location.pathname === "/" && (
        <input
          className="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearchText(e.target.value)}
        />
      )}
      <Link to="/cart" className="cart-link">
        🛒 Cart ({totalItems})
      </Link>
    </header>
  );
}

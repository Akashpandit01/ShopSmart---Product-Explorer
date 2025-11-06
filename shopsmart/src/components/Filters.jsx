import { useDispatch, useSelector } from "react-redux";
import {
  selectCategories,
  setCategory,
  setPriceRange,
  clearFilters,
} from "../products/productSlice";

export default function Filters() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const priceRange = useSelector((s) => s.products.priceRange);
  const [min, max] = priceRange;

  return (
    <div className="filters">
      <div className="row">
        <label>Category</label>
        <select onChange={(e) => dispatch(setCategory(e.target.value))}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
            
          ))}
        </select>
      </div>

      <div className="row">
        <label>Price Range</label>
        <div className="price-range">
          <input
            type="number"
            value={min}
            onChange={(e) =>
              dispatch(setPriceRange([Number(e.target.value), max]))
            }
          />
          <span>—</span>
          <input
            type="number"
            value={max}
            onChange={(e) =>
              dispatch(setPriceRange([min, Number(e.target.value)]))
            }
          />
        </div>
      </div>

      <button className="secondary" onClick={() => dispatch(clearFilters())}>
        Clear Filters
      </button>
    </div>
  );
}

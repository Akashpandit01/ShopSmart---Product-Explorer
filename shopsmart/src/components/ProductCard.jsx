import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import { formatCurrency } from "../utils/currency";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="price">{formatCurrency(product.price)}</p>
        <p className="category">{product.category}</p>
        <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
      </div>
    </div>
  );
}

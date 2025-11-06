import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItemsArray,
  selectTotals,
  addToCart,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../cart/cartSlice";
import { formatCurrency } from "../utils/currency";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItemsArray);
  const { totalItems, totalPrice } = useSelector(selectTotals);

  if (items.length === 0)
    return (
      <div className="container">
        <h2>Your cart is empty</h2>
      </div>
    );

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {items.map(({ product, qty }) => (
        <div key={product.id} className="cart-item">
          <img src={product.image} alt={product.title} />
          <div className="info">
            <h4>{product.title}</h4>
            <p>{formatCurrency(product.price)}</p>
          </div>
          <div className="qty">
            <button onClick={() => dispatch(decreaseQty(product.id))}>-</button>
            <span>{qty}</span>
            <button onClick={() => dispatch(addToCart(product))}>+</button>
          </div>
          <div className="line-total">
            {formatCurrency(product.price * qty)}
          </div>
          <button onClick={() => dispatch(removeFromCart(product.id))}>
            Remove
          </button>
        </div>
      ))}
      <hr />
      <h3>Total Items: {totalItems}</h3>
      <h3>Total Price: {formatCurrency(totalPrice)}</h3>
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    </div>
  );
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "./cart/cartSlice";

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {items.length === 0 && <p>Cart is empty</p>}
      {items.map((item) => (
        <div key={item.id} style={{ borderBottom: "1px solid #ccc" }}>
          <h4>{item.title}</h4>
          <p>${item.price}</p>
          <div>
            <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
            {item.quantity}
            <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
            <button
              onClick={() => {
                if (window.confirm("Remove this item?")) {
                  dispatch(removeFromCart(item.id));
                }
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      {items.length > 0 && (
        <>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </>
      )}
    </div>
  );
}

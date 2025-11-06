const CART_KEY = "shopsmart_cart_v1";

export function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return { items: {} };
    return JSON.parse(raw);
  } catch {
    return { items: {} };
  }
}

export function saveCart(cartState) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartState));
  } catch {}
}

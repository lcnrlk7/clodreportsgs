import { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFlavor?: string;
}

type CartListener = () => void;

let cartItems: CartItem[] = [];
const listeners: Set<CartListener> = new Set();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export const cartStore = {
  subscribe(listener: CartListener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getSnapshot(): CartItem[] {
    return cartItems;
  },

  addItem(product: Product, flavor?: string) {
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id && item.selectedFlavor === flavor
    );

    if (existingIndex >= 0) {
      cartItems = cartItems.map((item, i) =>
        i === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      cartItems = [
        ...cartItems,
        { product, quantity: 1, selectedFlavor: flavor },
      ];
    }
    notifyListeners();
  },

  removeItem(productId: string, flavor?: string) {
    cartItems = cartItems.filter(
      (item) =>
        !(item.product.id === productId && item.selectedFlavor === flavor)
    );
    notifyListeners();
  },

  updateQuantity(productId: string, quantity: number, flavor?: string) {
    if (quantity <= 0) {
      cartStore.removeItem(productId, flavor);
      return;
    }
    cartItems = cartItems.map((item) =>
      item.product.id === productId && item.selectedFlavor === flavor
        ? { ...item, quantity }
        : item
    );
    notifyListeners();
  },

  getTotal(): number {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  getItemCount(): number {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  },

  clear() {
    cartItems = [];
    notifyListeners();
  },
};

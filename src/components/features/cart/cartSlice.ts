import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getInitialState = (): CartState => {
  if (typeof window !== "undefined") {
    try {
      const persistedState = localStorage.getItem("cart");

      if (!persistedState) {
        return { items: [] };
      }

      const parsed = JSON.parse(persistedState);

      if (parsed && Array.isArray(parsed.items)) {
        return parsed;
      }

      return { items: [] };
    } catch (error) {
      return { items: [] };
    }
  }

  return { items: [] };
};
const initialState: CartState = getInitialState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.count += action.payload.count;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; count: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.count = action.payload.count;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

// cartReducer.js
import * as types from "./CartDataActionType";

const savedCartState = JSON.parse(localStorage.getItem("cartState"));

const initialState = {
  cartItems: savedCartState?.cartItems || [],
  count:
    savedCartState?.cartItems?.length > 0 ? savedCartState.cartItems.length : 0 // Initialize count based on cart items
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, payload],
        count: state.count + 1 // Increment count when adding item to cart
      };
    case types.REMOVE_FROM_CART:
      // Find the index of the item to be removed
      const index = state.cartItems.findIndex(
        (item) => item.productId._id === payload
      );
      // If item is found, remove it and decrement count
      if (index !== -1) {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item) => item.productId._id !== payload
          ),
          count: state.count - 1 // Decrement count when removing item from cart
        };
      }
      return state; // Return unchanged state if item is not found
    // Add other cases as needed
    default:
      return state;
  }
};

console.log(initialState);

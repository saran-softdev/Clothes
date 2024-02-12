// cartReducer.js
import * as types from "./CartDataActionType";

const savedCartState = JSON.parse(localStorage.getItem("cartState"));

const initialState = {
  cartItems: savedCartState ? savedCartState.cartItems : []
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let newState;

  switch (type) {
    case types.ADD_TO_CART:
      newState = {
        ...state,
        cartItems: [...state.cartItems, payload]
      };
      break;
    case types.REMOVE_FROM_CART:
      newState = {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== payload)
      };
      break;
    case types.UPDATE_QUANTITY:
      newState = {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item._id === payload.productId) {
            return { ...item, quantity: payload.quantity };
          }
          return item;
        })
      };
      break;
    default:
      return state;
  }

  try {
    localStorage.setItem("cartState", JSON.stringify(newState));
  } catch (error) {
    console.error("Error saving cart state to local storage:", error);
  }

  return newState;
};

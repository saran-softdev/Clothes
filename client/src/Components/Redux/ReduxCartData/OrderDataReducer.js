// orderReducer.js
import { PLACE_ORDER } from "./CartDataActionType";

const initialState = {
  orders: []
};

export const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PLACE_ORDER:
      // Place order logic
      const newOrder = action.payload;
      return {
        ...state,
        orders: [...state.orders, newOrder] // Assuming payload contains the new order data
      };
    default:
      return state;
  }
};

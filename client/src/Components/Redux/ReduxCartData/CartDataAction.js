import * as types from "./CartDataActionType";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const addToCart = (product) => {
  const productId = product._id;

  return async (dispatch) => {
    try {
      await axios.post(`${BACKEND_URL}/cart/add`, {
        productId: productId,
        userId: localStorage.getItem("userId")
      });
      dispatch({
        type: types.ADD_TO_CART,
        payload: product
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromCart = (productId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${BACKEND_URL}/cart/remove/${productId}`);
      dispatch({
        type: types.REMOVE_FROM_CART,
        payload: productId
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateQuantity = (productId, quantity) => {
  return async (dispatch) => {
    try {
      await axios.put(`${BACKEND_URL}/cart/update/${productId}`, { quantity });
      dispatch({
        type: types.UPDATE_QUANTITY,
        payload: { productId, quantity }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const placeOrder = (orderData) => ({
  type: types.PLACE_ORDER,
  payload: orderData
});

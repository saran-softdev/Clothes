import * as types from "./CartDataActionType";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const addToCart = (product) => {
  const productId = product._id;
  // console.log(product);

  return async (dispatch) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/cart/add`, {
        productId: productId,
        userId: localStorage.getItem("userId")
      });
      // console.log(response);

      if (response.status === 200) {
        dispatch({
          type: types.ADD_TO_CART,
          payload: product
        });
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromCart = (productId) => {
  const userId = localStorage.getItem("userId");

  return async (dispatch) => {
    try {
      await axios.delete(`${BACKEND_URL}/remove/${userId}/${productId}`);
      dispatch({
        type: types.REMOVE_FROM_CART,
        payload: productId
      });
    } catch (error) {
      console.log(error);
    }
  };
};

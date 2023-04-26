
import { AppThunk } from "./../store";
import { setCartItems } from "./cartSlice";

export const startSetCartItems =
(items: any  ): AppThunk => async (dispatch, getState) => {
  dispatch(setCartItems(items));
};
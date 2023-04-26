import { Category } from '@ecommerce-nx/interfaces'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  items: any 
  loadingItems: boolean
}

const initialState: CartState = {
    items: [],
  loadingItems: false
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadingCart: (state) => {
      state.loadingItems = true;
    },
    setCartItems: (state, action: PayloadAction<any>) => {

        state.items = action.payload
        state.loadingItems = false;
    }
    
  },
});


export const { setCartItems , loadingCart} = cartSlice.actions;


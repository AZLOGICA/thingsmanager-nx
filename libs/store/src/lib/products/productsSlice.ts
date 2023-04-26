
import { Product, Products } from '@ecommerce-nx/interfaces'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

export interface ProductState {
  products: Product[];
  loadingProducts: boolean;
  cursor: null | string;
  totalCount: null | number;
  hasMoreProducts: boolean;

  product: Product | null;
  loadingProduct: boolean;

  productsByCategory: Products
  loadingProductsByCategory: boolean;

  productsBySubCategory: Products
  loadingProductsBySubCategory: boolean;

  productsDetail:{[key: string]: Product }

}

const initialState: ProductState = {
  products: [],
  loadingProducts: false,
  cursor: null,
  totalCount: null,
  hasMoreProducts: true,

  product: null,
  loadingProduct: false,

  productsByCategory: {},
  loadingProductsByCategory: false,

  productsBySubCategory: {},
  loadingProductsBySubCategory: false,

  productsDetail: {}
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadingProducts: (state) => {
      state.loadingProducts = true;
    },
    setProducts: (state, action: PayloadAction<any>) => {
        if(action.payload.reset)  state.products = action.payload.products
        else state.products = [...state.products,  ...action.payload.products]
        if(action.payload.totalCount) state.totalCount = action.payload.totalCount;
        state.cursor = action.payload.cursor;
        if(action.payload.hasMore != null) state.hasMoreProducts = action.payload.hasMore;
        state.loadingProducts = false;
    },
    loadingProduct: (state) => {
      state.loadingProduct = true;
    },
    setProduct: (state, action: PayloadAction<any>) => {
      state.product = action.payload;
      state.loadingProduct = false;
    },
    loadingProductsByCategory: (state) => {
      state.loadingProductsByCategory = true;
    },
    setCategoryProducts: (state, action: PayloadAction<any>) => {
      state.productsByCategory[action.payload.categoryId] = {
        products: action.payload.products,
        cursor: action.payload.cursor,
        hasMoreProducts: action.payload.hasMore,
        subCategories: {}
      }
      state.loadingProductsByCategory = false;
    },
    setProductsByCategory: (state, action: PayloadAction<any>) => {
      if(action.payload.reset)  state.productsByCategory[action.payload.categoryId].products = action.payload.products
      else state.productsByCategory[action.payload.categoryId].products =  [...state.productsByCategory[action.payload.categoryId].products, ...action.payload.products];

     // state.productsByCategory[action.payload.categoryId].products = [...state.productsByCategory[action.payload.categoryId].products, ...action.payload.products];
      state.productsByCategory[action.payload.categoryId].cursor = action.payload.cursor;
      if(action.payload.hasMore != null) state.productsByCategory[action.payload.categoryId].hasMoreProducts = action.payload.hasMore; 
      state.loadingProductsByCategory = false;
    },
    loadingProductsBySubCategory: (state) => {
      state.loadingProductsBySubCategory = true;
    },
    setSubCategoryProducts: (state, action: PayloadAction<any>) => {
      state.productsBySubCategory[action.payload.subCategoryId] = {
        products: action.payload.products,
        cursor: action.payload.cursor,
        hasMoreProducts: action.payload.hasMore,
        subCategories: {}
      }
      state.loadingProductsBySubCategory = false;
    },
    setProductsBySubCategory: (state, action: PayloadAction<any>) => {
      if(action.payload.reset)  state.productsBySubCategory[action.payload.subCategoryId].products = action.payload.products
      else state.productsByCategory[action.payload.subCategoryId].products =  [...state.productsBySubCategory[action.payload.subCategoryId].products, ...action.payload.products];

     // state.productsByCategory[action.payload.categoryId].products = [...state.productsByCategory[action.payload.categoryId].products, ...action.payload.products];
      state.productsBySubCategory[action.payload.subCategoryId].cursor = action.payload.cursor;
      if(action.payload.hasMore != null) state.productsBySubCategory[action.payload.subCategoryId].hasMoreProducts = action.payload.hasMore; 
      state.loadingProductsBySubCategory = false;
    },

    setProductDetail: (state, action: PayloadAction<any>) => {
      state.productsDetail[action.payload.URL] = action.payload.item;
    }
  },
  extraReducers: {
    [HYDRATE]:  (state, action) => {
      return {
        ...state,
        ...action.payload.products
      }
    },
  }
});


export const { setProducts , loadingProducts, loadingProduct, 
  setProduct , loadingProductsByCategory, setProductsByCategory, 
  setCategoryProducts,
  setSubCategoryProducts,
  loadingProductsBySubCategory, setProductsBySubCategory,
  setProductDetail
} = productsSlice.actions; 


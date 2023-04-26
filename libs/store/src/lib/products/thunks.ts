import { getProducts, getProductsByCategory } from '@ecommerce-nx/utils';
import { AppThunk } from "../store";
import {
  loadingProduct,
  loadingProducts,
  loadingProductsByCategory,
  loadingProductsBySubCategory,
  setCategoryProducts,
  setProduct,
  setProducts,
  setProductsByCategory,
  setSubCategoryProducts,
} from "./productsSlice";


export const startLoadingAllProducts =
  (): AppThunk => async (dispatch, getState) => {

    dispatch(loadingProducts());
    const { cursor } = getState().products;
    const { site } = getState().companyMainInfo

    const allProducts = await getProducts({cursor, site});
    await dispatch(
      setProducts(allProducts)
    );

    return allProducts;
    /*
    console.log("starTLodingAllProduct");
    dispatch(loadingProducts());
    const { cursor } = getState().products;
    let variables: any = {};

    if (cursor) {
      variables.after = cursor;
    }

    const allProducts = await API.graphql<GraphQLQuery<GetAllProductsQuery>>(
      {
        query: queries.getAllProducts,
        variables,
      },
      APPSYNC_HEADERS
    );
    console.log("allProducts", allProducts);

    let products: any = [];
    let totalCount = null;
    let newCursor = null;
    let hasMore = null;

    if (allProducts.data?.getAllProducts?.products) {
      newCursor = allProducts.data.getAllProducts.cursor;
      if (allProducts.data?.getAllProducts?.totalCount != null)
        totalCount = allProducts.data?.getAllProducts?.totalCount;
      allProducts.data.getAllProducts.products.map((product) => {
        products.push({
          ...product,
          categories: product?.categories
            ? JSON.parse(product?.categories)
            : {},
        });
      });
      if (allProducts.data.getAllProducts.products.length < 10) hasMore = false;
      else hasMore = true;
    }

    await dispatch(
      setProducts({ products, totalCount, cursor: newCursor, hasMore })
    );

    return products;
    */
  };

export const startLoadingProduct =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    /*
    dispatch(loadingProduct());
    let product = null;
    console.log("startLoadingProduct", id);
    const getProduct = await API.graphql<GraphQLQuery<GetProductByIdQuery>>(
      {
        query: queries.getProductById,
        variables: {
          id,
        },
      },
      APPSYNC_HEADERS
    );
    console.log("getProduct", getProduct);
    if (getProduct.data?.getProductById) {
      product = getProduct.data.getProductById;
      if (product.categories)
        product.categories = JSON.parse(product.categories);
    }
    dispatch(setProduct(product));
    return product;
    */
  };

export const startLoadingProductsByCategory =
  (category: string, subCategory?: string): AppThunk => async (dispatch, getState) => {
    
    let cursor = null;
    if(subCategory){
      dispatch(loadingProductsBySubCategory())
      const subCategoryState = getState().products.productsBySubCategory;
      cursor = subCategoryState[subCategory].cursor;
    }
    else {
      dispatch(loadingProductsByCategory());
      const categoryState = getState().products.productsByCategory;
      cursor = categoryState[category].cursor;
    }

    const products = await getProductsByCategory({ 
       categoryId: category, subCategoryId: subCategory , cursor
      })
    
    if (subCategory) {
        dispatch(setSubCategoryProducts({ subCategoryId: subCategory, ...products, reset: true }))
    }
    else {
        dispatch(setCategoryProducts({ categoryId: category, ...products, reset: true }))
    }


    /*
    console.log("starTLodingAllProduct");
    dispatch(loadingProducts());
    const categoryState = getState().products.productsByCategory;

    let cursor = null;
    let categoryExist = false;

    if(!categoryState[category]){
      categoryExist = false;
    }
    else {
      categoryExist = true;
      cursor = categoryState[category].cursor;
    }

    let variables: any = {
      categoryId: category,
    };

    if (cursor) {
      variables.after = cursor;
    }
    console.log("variables", variables);

    const allProducts = await API.graphql<GraphQLQuery<GetProductsByCategoryQuery>>(
      {
        query: queries.getProductsByCategory,
        variables,
      },
      APPSYNC_HEADERS
    );
    console.log("allProducts", allProducts);

    let products: any = [];
    let totalCount = null;
    let newCursor = null;
    let hasMore = null;

    if (allProducts.data?.getProductsByCategory?.products) {
      newCursor = allProducts.data.getProductsByCategory.cursor;
      if (allProducts.data?.getProductsByCategory?.totalCount != null)
        totalCount = allProducts.data?.getProductsByCategory?.totalCount;
      allProducts.data.getProductsByCategory.products.map((product) => {
        products.push({
          ...product,
          categories: product?.categories
            ? JSON.parse(product?.categories)
            : {},
        });
      });
      if (allProducts.data.getProductsByCategory.products.length < 10) hasMore = false;
      else hasMore = true;
    }
    console.log("categoryExist", categoryExist)
    if(!categoryExist){
        await dispatch(setCategoryProducts({categoryId: category, products, totalCount, cursor: newCursor, hasMore }))
    }
    else {
      await dispatch(
        setProductsByCategory({ categoryId: category, products, totalCount, cursor: newCursor, hasMore })
      );
    }
   

    return products;
    */
  };

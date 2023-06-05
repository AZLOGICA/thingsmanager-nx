import { configureStore, ThunkAction, AnyAction, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { personsSlice } from "./persons/personsSlice";
import { authSlice } from "./auth/authSlice";
import storage from 'redux-persist/lib/storage' 
import { logsSlice } from "./logs/logsSlice";
import { dashboardSlice } from "./dashboard/dashboardSlice";

const combinedReducer = combineReducers({
  persons: personsSlice.reducer,
  auth: authSlice.reducer,
  logs: logsSlice.reducer,
  dashboard: dashboardSlice.reducer
});

//const persistedReducer = persistReducer(persistConfig, combinedReducer)

/*
const masterReducer = (state: any, action: any) => {
  
  if (action.type === HYDRATE) {
  
    const nextState = {
      ...state, // use previous state
      products: {
        ...action.payload.products
      },
    }
    return nextState;
  } else {
    
    return combinedReducer(state, action)
   //  return persistReducer(persistConfig,  combinedReducer(state, action) as any) 
 // }
}
*/

export const store = configureStore({
  reducer: combinedReducer,
 
});


//export let persistor = persistStore(store);
/*
export const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    products: productsSlice.reducer
    //config: configSlice.reducer
  },
});
*/

//const makeStore = () => store

const makeStore = () => {

  const isServer = typeof window === 'undefined';

  if (isServer) {
    //If it's on server side, create a store
    return store;
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require('redux-persist');

    const persistConfig = {
      key: 'root',
      whitelist: ['auth'], // only counter will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

    const store : any = configureStore({
      reducer: persistedReducer,
    });

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};




export type RootState = ReturnType<typeof store.getState>

export type AppStore = ReturnType<typeof makeStore>;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

export const wrapper = createWrapper<AppStore>(makeStore);
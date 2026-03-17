import { configureStore } from "@reduxjs/toolkit";
import UserDetailsReducer from "./Slice/UserDetails";
import UserProductsInfoReducer from "./Slice/UserProductInfo";

export const store = configureStore({
  reducer: {
    userDetails:UserDetailsReducer,
    userProductInfo : UserProductsInfoReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

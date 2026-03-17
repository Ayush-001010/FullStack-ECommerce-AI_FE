import { createSlice } from "@reduxjs/toolkit";
import type UserProductsInfoInterface from "../../Interface/Redux/UserProductsInfoInterface";

const initialState : UserProductsInfoInterface = {
    FavoriteProduct: []
};

const UserProductsInfoSlice  = createSlice({
    name: "UserProductsInfo",
    initialState,
    reducers: {
        setFavoriteProduct : (state, action) => {
            state.FavoriteProduct = action.payload;
        },
    }
});

export const { setFavoriteProduct } = UserProductsInfoSlice.actions;
export default UserProductsInfoSlice.reducer;
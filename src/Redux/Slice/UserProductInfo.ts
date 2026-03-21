import { createSlice } from "@reduxjs/toolkit";
import type UserProductsInfoInterface from "../../Interface/Redux/UserProductsInfoInterface";

const initialState : UserProductsInfoInterface = {
    FavoriteProduct: [],
    CardProducts: []
};

const UserProductsInfoSlice  = createSlice({
    name: "UserProductsInfo",
    initialState,
    reducers: {
        setFavoriteProduct : (state, action) => {
            state.FavoriteProduct = action.payload;
        },
        setCardProduct:(state , acttion) => {
            const { type  , productDetails} = acttion.payload;
            if(type === "add"){
                const isExist= (state.CardProducts.find((product) => product.productDetails.id === productDetails.id));
                if(isExist){
                    state.CardProducts = state.CardProducts.map((product) => {
                        if(product.productDetails.id === productDetails.id){
                            return {
                                ...product,
                                quantity : product.quantity + 1
                            }
                        }
                        return product;
                    });
                }else{
                    state.CardProducts.push({
                        productDetails,
                        quantity : 1
                    });
                }
            } else if(type === "remove"){
                const isExist= (state.CardProducts.find((product) => product.productDetails.id === productDetails.id));
                if(isExist){
                    state.CardProducts = state.CardProducts.map((product) => {
                        if(product.productDetails.id === productDetails.id){
                            return {
                                ...product,
                                quantity : product.quantity - 1
                            }
                        }
                        return product;
                    }).filter((product) => product.quantity > 0);
                }
            }
        }
    }
});

export const { setFavoriteProduct , setCardProduct } = UserProductsInfoSlice.actions;
export default UserProductsInfoSlice.reducer;
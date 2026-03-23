import { useSelector } from "react-redux";
import type UserDetailsInterface from "../../Interface/Redux/UserDetailsInterface";
import APICallingServices from "../APICallingServices";

const useUserProductAction = () => {
    const {email} = useSelector((state : any) => state.userDetails as UserDetailsInterface);
    const addFavorite = async (productId : number) => {
        const response = await APICallingServices.postRequest("/product/addToFavorites",{
            userEmail : email,
            productId
        });
        return response.success;
    }
    const deleteFavorite = async (productId : number) => {
        const response = await APICallingServices.getRequest("/product/removeFromFavorites?userEmail=" + email + "&productId=" + productId);
        return response;
    }
    const getFavorites = async () => {
        const response = await APICallingServices.getRequest("/product/getFavorites?email=" + email);
        return response.data;
    }
    const searchProducts = async (query : string) => {
        const response = await APICallingServices.postRequest("/product/searchProduct",{searchText : query});
        return response.data || [];
    }

    return { addFavorite , getFavorites , deleteFavorite , searchProducts};
};

export default useUserProductAction;
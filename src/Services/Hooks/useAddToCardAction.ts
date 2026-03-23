import { useSelector } from "react-redux";
import type UserProductsInfoInterface from "../../Interface/Redux/UserProductsInfoInterface";
import { useEffect, useState } from "react";
import type UserDetailsInterface from "../../Interface/Redux/UserDetailsInterface";
import APICallingServices from "../APICallingServices";

const useAddToCardAction = () => {
    const { CardProducts } = useSelector((state: any) => state.userProductInfo as UserProductsInfoInterface);
    const { email } = useSelector((state: any) => state.userDetails as UserDetailsInterface);
    const [isFisrt , setIsFirst] = useState(true); 

    const setCardProductsOnDB = async () => {
        await APICallingServices.postRequest("/product/setCartValue", {
            userEmail : email,
            products : CardProducts
        });
        return;
    }
    const getCardProductsFromDB = async () => {
        const response = await APICallingServices.getRequest("/product/getCartProducts?userEmail="+email);
        return response.data;
    }

    useEffect(() => {
        const obj = setTimeout(() => {
            if(!isFisrt){
                setCardProductsOnDB();
            }else{
                setIsFirst(false);
            }
        }, 10);
        return () => clearTimeout(obj);
    }, [CardProducts]);

    return {getCardProductsFromDB};

};

export default useAddToCardAction;
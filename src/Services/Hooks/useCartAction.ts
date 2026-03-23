import { useCallback, useEffect, useState } from "react";
import APICallingServices from "../APICallingServices";
import { useSelector } from "react-redux";
import type UserDetailsInterface from "../../Interface/Redux/UserDetailsInterface";
import type { CartProductInterface } from "../../Interface/ProductInterface";

const useCartAction = () => {
    const [cartItems, setCartItems] = useState<Array<CartProductInterface>>([]);
    const {email } = useSelector((state: any) => state.userDetails as UserDetailsInterface);

    const getCartDetails = useCallback(async () => {
        const response = await APICallingServices.getRequest("/product/getCartProducts?userEmail="+email+"&inFullDetails=true");
        return response;
    },[]);
    const placeOrder = async () => {
        const response = await APICallingServices.postRequest("/product/orderProducts",{
            userEmail: email,
            products : cartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity
            }))
        });
        return response;
    };
    
    useEffect(() => {
        getCartDetails().then((response) => {
            console.log(response);
            setCartItems(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return { cartItems , placeOrder};
}

export default useCartAction;
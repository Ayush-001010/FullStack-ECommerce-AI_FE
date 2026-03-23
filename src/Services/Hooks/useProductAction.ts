import { useEffect, useState } from "react";
import APICallingServices from "../APICallingServices";
import type ProductInterface from "../../Interface/ProductInterface";

const useProductAction = () => {
    const [productArr , setProductArr] = useState<Array<ProductInterface>>([]);

    const getProducts = async (pageNo : number = 1) => {
        try {
            const response = await APICallingServices.postRequest("/product/getDetails" , { pageNo });
            if(pageNo === 1){
                setProductArr(response.data || []);
            } else {
                setProductArr(prev => [...prev, ...(response.data || [])]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(()=>{
        getProducts();
    },[])

    return { getProducts , productArr };
}

export default useProductAction;
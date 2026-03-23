import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import APICallingServices from "../APICallingServices";
import type ProductInterface from "../../Interface/ProductInterface";

const useSearchAction = () => {
    const  [searchParams]  = useSearchParams();
    const [data , setData] = useState<Array<ProductInterface>>([]);

    const getSarchData = async (searchText : string) => {
        const response = await APICallingServices.postRequest("/product/searchProduct",{searchText , isDisplay : true});
        return response.data || [];
    }
    
    useEffect(() => {
        getSarchData(searchParams.get("product") || "").then(data => {
            setData(data);
        });
    }, [searchParams]);

    return {data};
}

export default useSearchAction;
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import APICallingServices from "../APICallingServices";
import type ProductInterface from "../../Interface/ProductInterface";

const useSearchAction = () => {
    const  [searchParams]  = useSearchParams();
    console.log("Search query:", searchParams.get("product"));
    const [data , setData] = useState<Array<ProductInterface>>([]);

    const getSarchData = async (searchText : string) => {
        const response = await APICallingServices.postRequest("/product/searchProduct",{searchText , isDisplay : true});
        console.log(response);
        return response.data || [];
    }
    
    useEffect(() => {
        getSarchData(searchParams.get("product") || "").then(data => {
            console.log("Search results:", data);
            setData(data);
        });
    }, [searchParams]);

    return {data};
}

export default useSearchAction;
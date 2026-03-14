import { useEffect, useState } from "react";
import APICallingServices from "../APICallingServices";
import type IBannerInterface from "../../Interface/BannerInterface";

const useBannerAction = () => {
    const [bannerImages , setBannerImages] = useState<Array<IBannerInterface>>([]);
    const getBannerDetails = async () => {
        const response = await APICallingServices.postRequest("/ecom/getBanners",{});
        return response;
    }

    useEffect(() => {
        getBannerDetails().then((response) => {
            const data : Array<IBannerInterface> = [];
            for(const value in response.data){
                data.push({
                    BannerText : response.data[value].Text,
                    ImageURL : response.data[value].ImageURL,
                    RouteURL : response.data[value].RouteURL
                });
            }
            setBannerImages(data);
        }).catch((error) => {
            console.error("Error fetching banner details", error);
        });
    }, []);

    return {bannerImages};
};

export default useBannerAction;
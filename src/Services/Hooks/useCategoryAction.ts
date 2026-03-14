import { useEffect, useState } from "react";
import APICallingServices from "../APICallingServices";
import type CategoryInterface from "../../Interface/CategoryInterface";

const useCategoryAction = () => {
  const [categories, setCategories] = useState<Array<CategoryInterface>>([]);

  const getCategories = async (pageNo:number = 1) => {
    console.log("Fetching categories for page:", pageNo);
    const res = await APICallingServices.postRequest("/ecom/getCategories", {
      pageNo,
    });
    console.log(res.data);
    if (res.success) {
      const data: Array<CategoryInterface> = [];
      for (const category of res.data) {
        data.push({
          Name: category.Name,
          ImageURL: category.ImageURL,
          RouteURL: category.RouteURL,
        });
      }
      if (pageNo === 1) {
        setCategories(data);
      } else {
        setCategories((prev) => [...prev, ...data]);
      }
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return { getCategories, categories };
};

export default useCategoryAction;

import { useQuery } from "react-query";
import axios from "axios";

const productsUrl = "https://fakestoreapi.com/products";

const getProducts = async () => {
  const response = await axios.get(productsUrl);
  return response.data;
};

export const UseGetAllProducts = () => {
  const { isLoading, data, refetch } = useQuery(["products"], getProducts);
  return { data, isLoading, refetch };
};

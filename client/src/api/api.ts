import axios from "axios";
import { sortProducts } from "../controller/sort";
import { IProduct } from "./type";

export const getProducts = async () => {
  const res = await axios.get(`https://ikw-market.shop/api/product`);
  const data: IProduct[] = sortProducts(res.data.products.reverse());

  return data;
};

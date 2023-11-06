import axios from "axios";
import { sortProducts } from "../controller/sort";
import { IProduct } from "./productType";

const getProducts = async () => {
  const res = await axios.get(`https://ikw-market.shop/api/product`);
  const data: IProduct[] = sortProducts(res.data.products.reverse());

  return data;
};

export { getProducts };

import axios from "axios";
import { sortProducts } from "../controller/sort";
import { IProduct } from "./productType";

const getProducts = async () => {
  // const res = await axios.get(`https://ikw-market.shop/api/product`);
  const res = await axios.get(`${process.env.REACT_APP_EXPRESS_URL}/api/product`);

  const data: IProduct[] = sortProducts(res.data.products.reverse());

  return data;
};

export { getProducts };

import axios from "axios";
import { sortProducts } from "../controller/sort";
import { IProduct } from "./productType";

<<<<<<< HEAD
export const getProducts = async () => {
  // const res = await axios.get(`https://ikw-market.shop/api/product`);
  const res = await axios.get(`${process.env.REACT_APP_EXPRESS_URL}/api/product`);

=======
const getProducts = async () => {
  const res = await axios.get(`https://ikw-market.shop/api/product`);
>>>>>>> 9950a2d57f1b604a740dc883739fe6773385604f
  const data: IProduct[] = sortProducts(res.data.products.reverse());

  return data;
};

export { getProducts };

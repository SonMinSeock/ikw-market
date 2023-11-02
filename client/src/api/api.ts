import axios from "axios";
import { sortProducts } from "../controller/sort";

export const getProducts = async () => {
  const data = await axios
    .get(`https://ikw-market.shop/api/product`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return data;
};

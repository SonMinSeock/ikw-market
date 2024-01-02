import axios from "axios";
import { sortProducts } from "../controller/sort";
import { IProduct } from "../types/productType";

const getProducts = async () => {
  const res = await axios.get(`${process.env.REACT_APP_EXPRESS_URL}/api/product`);
  const data: IProduct[] = sortProducts(res.data.products.reverse());

  return data;
};

const getProduct = async (id: string) => {
  const res = await axios.get(`${process.env.REACT_APP_EXPRESS_URL}/api/product/${id}`);
  const data: IProduct = res.data.product;
  return data;
};

const deleteProduct = async (id: string) => {
  const { updateUser } = await (
    await axios.delete(`${process.env.REACT_APP_EXPRESS_URL}/api/product/${id}/delete`, { withCredentials: true })
  ).data;
  return updateUser;
};

const updateProduct = async (id: any) => {
  await axios.post(
    `${process.env.REACT_APP_EXPRESS_URL}/api/product/${id}/update`,
    { state: true },
    { withCredentials: true }
  );
};

export { getProducts, deleteProduct, updateProduct, getProduct };

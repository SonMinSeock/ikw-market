import axios from "axios";
import { sortProducts } from "../controller/sort";
import { IProduct } from "../types/productType";

const getProducts = async () => {
  const res = await axios.get(`/api/product`);

  const data: IProduct[] = sortProducts(res.data.products.reverse());

  return data;
};

const getProduct = async (id: string) => {
  const data: IProduct = await axios
    .get(`/api/product/${id}`)
    .then((res) => res.data.product)
    .catch((err) => {
      if (err.response.status === 401) {
        window.location.href = "/login";
      }
    });

  return data;
};

const uploadProduct = async (data: object) => {
  await axios
    .post(`/api/product/upload`, data, { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        window.location.href = `/`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteProduct = async (id: string) => {
  const { updateUser } = await (await axios.delete(`/api/product/${id}/delete`, { withCredentials: true })).data;
  return updateUser;
};

const updateProduct = async (id: any) => {
  await axios.post(`/api/product/${id}/update`, { state: true }, { withCredentials: true });
};

export { getProducts, uploadProduct, deleteProduct, updateProduct, getProduct };

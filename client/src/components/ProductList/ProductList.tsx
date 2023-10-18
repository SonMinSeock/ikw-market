import React, { useEffect, useState } from "react";
import Product from "../atoms/Product/Product";
import { ProductsLayout } from "./ProductList.style";
import axios from "axios";

interface IProduct {
  description: string;
  location: string;
  product_images: any;
  product_name: string;
  product_price: string;
  seller_info: any;
  __v: number;
  _id: string;
}
const ProductList = () => {
  const [products, setProducts] = useState([]);
  // 밑에처럼 수정해야함
//const [products, setProducts] = useState<IProduct[]>([]);
  // const products: IProduct[] = [
  //   {
  //     img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
  //     name: "의자팝니다",
  //     price: 100000,
  //     location: "2호관",
  //   },
  //   {
  //     img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
  //     name: "의자팝니다",
  //     price: 100000,
  //     location: "2호관",
  //   },
  //   {
  //     img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
  //     name: "의자팝니다",
  //     price: 100000,
  //     location: "2호관",
  //   },
  //   {
  //     img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
  //     name: "의자팝니다",
  //     price: 100000,
  //     location: "2호관",
  //   },
  //   {
  //     img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
  //     name: "의자팝니다",
  //     price: 100000,
  //     location: "2호관",
  //   },
  //   {
  //     img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
  //     name: "의자팝니다",
  //     price: 100000,
  //     location: "2호관",
  //   },
  //   {
  //     img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
  //     name: "의자팝니다",
  //     price: 100000,
  //     location: "2호관",
  //   },
  // ];

  const getProductsAPI = async () => {
    let { products } = await (await axios.get("http://localhost:3002/product", { withCredentials: true })).data;

    products = products.map((product: any) => {
      return {
        ...product,
      };
    });
    setProducts(products);
  };

  useEffect(() => {
    getProductsAPI();
  }, []);

  return (
    <ProductsLayout>
      {products.map((product, idx) => {
        return <Product key={idx} product={product} />;
      })}
    </ProductsLayout>
  );
};

export default ProductList;

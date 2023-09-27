import React from "react";
import Product from "../atoms/Product/Product";
import { ProductsLayout } from "./ProductList.style";
interface IProduct {
  img: string;
  name: string;
  price: number;
  location: string;
}
const Products = () => {
  const products: IProduct[] = [
    {
      img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
    {
      img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
    {
      img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
    {
      img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
    {
      img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
    {
      img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
    {
      img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
  ];
  return (
    <ProductsLayout>
      {products.map((product, idx) => {
        return <Product key={idx} {...product} />;
      })}
    </ProductsLayout>
  );
};

export default Products;

import React, { useEffect, useState } from "react";
import Product from "../atoms/Product/Product";
import { ProductsLayout } from "./ProductList.style";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { searchTextAtom } from "../../recoil/login/atoms";
import { searchObj } from "../../controller/search";

interface IProduct {
  img: string;
  name: string;
  price: number;
  location: string;
}
const Products = () => {
  const [products, setProducts] = useState([]);
  const searchText = useRecoilValue(searchTextAtom);
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
        name: product["product_name"],
        img: product["product_images"][0],
        price: product["product_price"],
      };
    });
    setProducts(products);
  };
  useEffect(() => {
    getProductsAPI();
  }, []);

  useEffect(() => {
    searchObj.products(searchText, getProductsAPI, products, setProducts);
  }, [products]);

  return (
    <ProductsLayout>
      {products.map((product, idx) => {
        return <Product key={idx} product={product} index={idx} />;
      })}
    </ProductsLayout>
  );
};

export default Products;

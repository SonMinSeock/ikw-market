import React, { useEffect, useState } from "react";
import Product from "../atoms/Product/Product";
import { ProductsLayout } from "./ProductList.style";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchProductsAtom, searchTextAtom } from "../../recoil/login/atoms";
import { searchObj } from "../../controller/search";
import { sortProducts } from "../../controller/sort";

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
  const searchText = useRecoilValue(searchTextAtom);
  const [searchProducts, setSearchProducts] = useRecoilState(searchProductsAtom);
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
    let { products } = await (await axios.get("https://ikw-market.shop/api/product", { withCredentials: true })).data;

    products = products.map((product: any) => {
      return {
        ...product,
      };
    });

    setProducts(sortProducts(products.reverse()));
  };

  useEffect(() => {
    getProductsAPI();
  }, []);

  useEffect(() => {
    searchObj.products(searchText, getProductsAPI, products, setSearchProducts);
  }, [searchText]);

  const showProducts = () => {
    if (searchProducts.length !== 0) {
      return searchProducts.map((product, idx) => {
        return <Product key={idx} product={product} />;
      });
    } else {
      return products.map((product, idx) => {
        return <Product key={idx} product={product} />;
      });
    }
  };
  return <ProductsLayout>{showProducts()}</ProductsLayout>;
};

export default ProductList;

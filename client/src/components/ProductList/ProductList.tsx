import React, { useEffect, useState } from "react";
import Product from "../atoms/Product/Product";
import { ProductsLayout } from "./ProductList.style";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchProductsAtom, searchTextAtom } from "../../recoil/login/atoms";
import { searchObj } from "../../controller/search";
import { sortProducts } from "../../controller/sort";
import { getProducts } from "../../api/productData";
import { useQuery } from "react-query";

const ProductList = () => {
  const searchText = useRecoilValue(searchTextAtom);
  const [searchProducts, setSearchProducts] = useRecoilState(searchProductsAtom);
  const { isLoading, data } = useQuery(["Products"], getProducts);
  const products = data || [];

  // const getProductsAPI = async () => {
  //   let { products } = await (await axios.get("https://ikw-market.shop/api/product", { withCredentials: true })).data;

  //   products = products.map((product: any) => {
  //     return {
  //       ...product,
  //     };
  //   });

  //   setProducts(sortProducts(products.reverse()));
  // };

  // useEffect(() => {
  //   getProductsAPI();
  // }, []);

  // useEffect(() => {
  //   searchObj.products(searchText, getProductsAPI, products, setSearchProducts);
  // }, [searchText]);

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

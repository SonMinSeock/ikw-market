import { useEffect } from "react";
import Product from "../../../components/atoms/Product/Product";
import { ProductsLayout } from "./ProductList.style";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchProductsAtom, searchTextAtom } from "../../../recoil/login/atoms";
import { searchObj } from "../../../controller/search";
import { getProducts } from "../../../api/productData";
import { useQuery } from "react-query";

const ProductList = () => {
  const searchText = useRecoilValue(searchTextAtom);
  const [searchProducts, setSearchProducts] = useRecoilState(searchProductsAtom);
  const { isLoading, data } = useQuery(["Products"], getProducts, {
    staleTime: 15000,
    refetchInterval: 200000,
    refetchIntervalInBackground: true,
  });
  const products = data || [];

  useEffect(() => {
    searchObj.products(searchText, getProducts, products, setSearchProducts);
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
  return <ProductsLayout>{isLoading ? <div>Loading...</div> : showProducts()}</ProductsLayout>;
};

export default ProductList;

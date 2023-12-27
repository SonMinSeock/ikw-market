import React from "react";
import styled from "styled-components";
import Text from "../../components/common/atoms/Text";
import ProductList from "./organism/ProductList";
import { useQuery } from "react-query";
import { getProducts } from "../../api/productData";

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 64px;
  padding-bottom: 20px;
  width: 768px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 860px) {
    width: auto;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const Main = () => {
  const { isLoading, data } = useQuery(["Products"], getProducts, {
    staleTime: 3000,
    refetchInterval: 200000,
    refetchIntervalInBackground: true,
  });
  const products = data || [];

  return (
    <MainLayout>
      <Text style={{ fontSize: "32px", margin: "35px 0px", fontFamily: "GmarketSansMedium" }}>최근 중고거래 매물</Text>
      <ProductList products={products} />
    </MainLayout>
  );
};

export default Main;

// productCard + Title 로 페이지 만들기

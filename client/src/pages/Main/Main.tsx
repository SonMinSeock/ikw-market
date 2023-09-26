import React from "react";
import * as S from "./Main.style";
import Product from "../../components/Product/Product";

const Main = () => {
  const product = [
    {
      img: null,
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
    {
      img: null,
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
  ];
  return (
    <S.MainLayout>
      <S.MainTitle>최근 중고거래 매물</S.MainTitle>
      <S.MainSection>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </S.MainSection>
    </S.MainLayout>
  );
};

export default Main;

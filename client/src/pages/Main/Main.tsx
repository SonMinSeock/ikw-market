import React from "react";
import * as S from "./Main.style";

import ProductList from "../../components/ProductList/ProductList";

const Main = () => {
  return (
    <S.MainLayout>
      <S.MainTitle>최근 중고거래 매물</S.MainTitle>
      <ProductList />
    </S.MainLayout>
  );
};

export default Main;

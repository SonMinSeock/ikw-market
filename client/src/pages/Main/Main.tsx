import React from "react";
import * as S from "./Main.style";

import Products from "../../components/ProductList/Products";

const Main = () => {
  return (
    <S.MainLayout>
      <S.MainTitle>최근 중고거래 매물</S.MainTitle>
      <Products />
    </S.MainLayout>
  );
};

export default Main;

import * as S from "./Main.style";

import ProductList from "./ProductList/ProductList";

const Main = () => {
  console.log("REACT_APP_EXPRESS_URL:", process.env.REACT_APP_EXPRESS_URL);

  // ... (다른 환경 변수들도 추가)

  return (
    <S.MainLayout>
      <S.MainTitle>최근 중고거래 매물</S.MainTitle>
      <ProductList />
    </S.MainLayout>
  );
};

export default Main;

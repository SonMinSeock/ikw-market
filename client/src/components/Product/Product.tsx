import * as S from "./Product.style";
const Product = () => {
  return (
    <S.ProductLayout>
      <S.ProductImg src="https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png" />
      <S.ProductInfoBox>
        <S.ProductTitle>의자팝니다</S.ProductTitle>
        <S.ProductPriceSpan>100,000원</S.ProductPriceSpan>
        <S.ProductLocationSpan>2호관</S.ProductLocationSpan>
      </S.ProductInfoBox>
    </S.ProductLayout>
  );
};

export default Product;

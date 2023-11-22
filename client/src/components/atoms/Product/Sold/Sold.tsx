import * as S from "./Sold.style";
const Sold = ({ onRedirect, product, isClickHandler = false }: any) => {
  return isClickHandler ? (
    <S.ProductSoldCover onClick={() => onRedirect(`/product/${product?._id}`)}>판매완료</S.ProductSoldCover>
  ) : (
    <S.ProductSoldCover>판매완료</S.ProductSoldCover>
  );
};

export default Sold;

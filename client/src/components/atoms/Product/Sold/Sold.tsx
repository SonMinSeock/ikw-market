import * as S from "./Sold.style";
const Sold = ({ onRedirect, product }: any) => {
  return <S.ProductSoldCover onClick={() => onRedirect(`/product/${product?._id}`)}>판매완료</S.ProductSoldCover>;
};

export default Sold;

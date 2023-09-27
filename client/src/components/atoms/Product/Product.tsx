import * as S from "./Product.style";
interface IProduct {
  img: string;
  name: string;
  price: number;
  location: string;
}
const Product = (product: IProduct) => {
  return (
    <S.ProductLayout>
      <S.ProductImg src={product.img} />
      <S.ProductInfoBox>
        <S.ProductTitle>{product.name}</S.ProductTitle>
        <S.ProductPriceSpan>{product.price}원</S.ProductPriceSpan>
        <S.ProductLocationSpan>{product.location}</S.ProductLocationSpan>
      </S.ProductInfoBox>
    </S.ProductLayout>
  );
};

export default Product;

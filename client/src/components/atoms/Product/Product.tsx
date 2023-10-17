import { useNavigate } from "react-router-dom";
import * as S from "./Product.style";
interface IProduct {
  img: string;
  name: string;
  price: number;
  location: string;
  index: number;
}
const Product = ({ product }: any) => {
  const navigagte = useNavigate();

  const onRedirect = (url = "") => {
    return navigagte(url, { state: { ...product } });
  };
  return (
    <S.ProductLayout onClick={() => onRedirect(`/product/${product.index}`)}>
      <S.ProductImg src={product.img} type="thumbnail" />
      <S.ProductInfoBox>
        <S.ProductTitle>{product.name}</S.ProductTitle>
        <S.ProductPriceSpan>{product.price}원</S.ProductPriceSpan>
        <S.ProductLocationSpan>{product.location}</S.ProductLocationSpan>
      </S.ProductInfoBox>
    </S.ProductLayout>
  );
};

export default Product;

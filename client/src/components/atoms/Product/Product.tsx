import { useNavigate } from "react-router-dom";
import * as S from "./Product.style";
import Sold from "./Sold/Sold";
import { IProduct } from "../../../types/productType";

const Product = ({ product }: { product: IProduct }) => {
  const navigagte = useNavigate();
  const onRedirect = (url = "") => {
    return navigagte(url, { state: { ...product } });
  };

  return (
    <S.ProductLayout>
      <S.ProductImgBox onClick={() => onRedirect(`/product/${product?._id}`)}>
        {/* <S.ProductImg src={product.images[0]} type="thumbnail" /> */}
        <S.ProductImg
          src={"https://thumbs.dreamstime.com/b/stack-books-isolated-white-background-34637153.jpg"}
          type="thumbnail"
        />
        {product.state && <Sold />}
        <S.ProductInfoBox>
          <S.ProductTitle>{product.name}</S.ProductTitle>
          <S.ProductPriceSpan>{product.price}원</S.ProductPriceSpan>
          <S.ProductLocationSpan>{product.location}</S.ProductLocationSpan>
        </S.ProductInfoBox>
      </S.ProductImgBox>
    </S.ProductLayout>
  );
};

export default Product;

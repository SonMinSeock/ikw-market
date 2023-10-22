import { useNavigate } from "react-router-dom";
import * as S from "./Product.style";
import Sold from "../Sold/Sold";

interface IProduct {
  _id: string;
  product_name: string;
  product_images: [string];
  product_price: string;
  product_state: false;
  location: string;
  description: string;
  seller_info: object;
  __v: 0;
}

const Product = ({ product }: { product: IProduct }) => {
  const navigagte = useNavigate();
  const onRedirect = (url = "") => {
    return navigagte(url, { state: { ...product } });
  };
  // console.log("Product : ");

  return (
    <S.ProductLayout onClick={() => onRedirect(`/product/${product?._id}`)}>
      <S.ProductImgBox>
        <S.ProductImg src={product.product_images[0]} type="thumbnail" />
        {product.product_state && <Sold />}
      </S.ProductImgBox>
      <S.ProductInfoBox>
        <S.ProductTitle>{product.product_name}</S.ProductTitle>
        <S.ProductPriceSpan>{product.product_price}원</S.ProductPriceSpan>
        <S.ProductLocationSpan>{product.location}</S.ProductLocationSpan>
      </S.ProductInfoBox>
    </S.ProductLayout>
  );
};

export default Product;

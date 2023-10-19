import { useNavigate } from "react-router-dom";
import * as S from "./Product.style";

interface IProduct {
  description: string;
  location: string;
  product_images: any;
  product_name: string;
  product_price: string;
  seller_info: any;
  __v: number;
  _id: string;
}

const Product = ({ product }: { product: IProduct }) => {
  const navigagte = useNavigate();
  const onRedirect = (url = "") => {
    return navigagte(url, { state: { ...product } });
  };
  console.log("Product : ");

  return (
    <S.ProductLayout onClick={() => onRedirect(`/product/${product?._id}`)}>
      <S.ProductImg src={product.product_images[0]} type="thumbnail" />
      <S.ProductInfoBox>
        <S.ProductTitle>{product.product_name}</S.ProductTitle>
        <S.ProductPriceSpan>{product.product_price}원</S.ProductPriceSpan>
        <S.ProductLocationSpan>{product.location}</S.ProductLocationSpan>
      </S.ProductInfoBox>
    </S.ProductLayout>
  );
};

export default Product;

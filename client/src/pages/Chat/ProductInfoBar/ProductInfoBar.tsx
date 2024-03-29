import { IProduct } from "../../../types/productType";
import * as S from "./ProductInforBar.style";

interface ProductInfoBarProps {
  product: IProduct;
}
const ProductInfoBar = ({ product }: ProductInfoBarProps) => {
  return (
    <S.ProductInfoBarLayout>
      <S.ProductInfoBarImg>
        <img src={product.images[0]} alt="상품이미지" />
        {/* <img /> */}
      </S.ProductInfoBarImg>
      <S.ProductInfoBarDetailBox>
        <S.ProductInfoBarName>
          <span>{product.name}</span>
        </S.ProductInfoBarName>
        <S.ProductInfoBarPrice>
          <span>{product.price}</span>
        </S.ProductInfoBarPrice>
      </S.ProductInfoBarDetailBox>
    </S.ProductInfoBarLayout>
  );
};

export default ProductInfoBar;

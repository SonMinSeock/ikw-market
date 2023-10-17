import * as S from "./ProductDetail.style";
import { useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";
import Slider from "../../components/Animation/Slider/Slider";

interface IProduct {
  description: string;
  img: string;
  location: string;
  name: string;
  price: string;
  product_images: [];
  product_name: string;
  product_price: string;
  seller_info: string;
  __v: number;
  _id: object;
}
const ProductDetail = () => {
  const location = useLocation();
  const product: IProduct = location.state;
  const navigate = useNavigate();

  const onRedirect = () => navigate("/chat");

  return (
    <S.ProductDetailBox>
      <S.ProductDetailLayout>
        <Slider images={product.product_images} />
        <S.ProductDetailProfileBox>
          <CgProfile size={28} />
          <S.ProductDetailText>이름</S.ProductDetailText>
        </S.ProductDetailProfileBox>
        <S.ProductDetailInfoBox>
          <S.ProductDetailInfoParagraph>{product.name}</S.ProductDetailInfoParagraph>
          <S.ProductDetailInfoText type="bold">{product.price}</S.ProductDetailInfoText>
          <S.ProductDetailLocationBox>
            <CiLocationOn size={23} />
            <S.ProductDetailText>{product.location}</S.ProductDetailText>
          </S.ProductDetailLocationBox>
          <S.ProductDetailInfoParagraph>{product.description}</S.ProductDetailInfoParagraph>
          <S.ProductDetailViewBox>
            <S.ProductDetailText>조회수</S.ProductDetailText>
            <S.ProductDetailText>123123</S.ProductDetailText>
          </S.ProductDetailViewBox>
        </S.ProductDetailInfoBox>
        <S.ProductDetailBtn onClick={onRedirect}>채팅하기</S.ProductDetailBtn>
      </S.ProductDetailLayout>
    </S.ProductDetailBox>
  );
};

export default ProductDetail;

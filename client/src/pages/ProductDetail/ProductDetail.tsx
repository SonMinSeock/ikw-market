import * as S from "./ProductDetail.style";
import { useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";
import Slider from "../../components/Animation/Slider/Slider";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/login/atoms";

interface IProduct {
  description: string;
  img: string;
  location: string;
  name: string;
  price: string;
  product_images: [];
  product_name: string;
  product_price: string;
  seller_info: any;
  __v: number;
  _id: object;
}
const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product: IProduct = location.state;

  const onRedirect = () => navigate("/chat");
  const userInfo = useRecoilValue(userAtom);
  const userId = userInfo._id;
  const productSellerId = product.seller_info._id;

  return (
    <S.ProductDetailBox>
      <S.ProductDetailLayout>
        <Slider images={product.product_images} />
        <S.ProductDetailProfileBox>
          <CgProfile size={28} />
          <S.ProductDetailText>{product.seller_info.nickname}</S.ProductDetailText>
        </S.ProductDetailProfileBox>
        <S.ProductDetailInfoBox>
          <S.ProductDetailInfoParagraph>{product.product_name}</S.ProductDetailInfoParagraph>
          <S.ProductDetailInfoText type="bold">{product.product_price}원</S.ProductDetailInfoText>
          <S.ProductDetailLocationBox>
            <CiLocationOn size={23} />
            <S.ProductDetailText>{product.product_price}</S.ProductDetailText>
          </S.ProductDetailLocationBox>
          <S.ProductDetailInfoParagraph>{product.description}</S.ProductDetailInfoParagraph>
          <S.ProductDetailViewBox>
            <S.ProductDetailText>조회수</S.ProductDetailText>
            <S.ProductDetailText>123123</S.ProductDetailText>
          </S.ProductDetailViewBox>
        </S.ProductDetailInfoBox>
        {userId === productSellerId ? (
          <S.ButtonRow>
            <S.ProductDetailBtn onClick={onRedirect}>수정하기</S.ProductDetailBtn>
            <S.ProductDetailBtn onClick={onRedirect}>삭제하기</S.ProductDetailBtn>
          </S.ButtonRow>
        ) : (
          <S.ButtonRow>
            <S.ProductDetailBtn onClick={onRedirect}>채팅하기</S.ProductDetailBtn>
          </S.ButtonRow>
        )}
      </S.ProductDetailLayout>
    </S.ProductDetailBox>
  );
};

export default ProductDetail;

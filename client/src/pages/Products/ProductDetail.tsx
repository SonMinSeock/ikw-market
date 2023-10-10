import React from "react";
import * as S from "./ProductDetail.style";
import { ProductImg } from "../../components/atoms/Product/Product.style";
import { useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onRedirect = () => navigate("/chat");
  return (
    <S.ProductDetailBox>
      <S.ProductDetailLayout>
        <S.AlbumSlideBox>
          <AiOutlineLeft size={18} />
          <S.ProductDetailImg src={location.state.img} />
          <AiOutlineRight size={18} />
        </S.AlbumSlideBox>
        <S.ProductDetailProfileBox>
          <CgProfile size={28} />
          <S.ProductDetailText>닉네임123</S.ProductDetailText>
        </S.ProductDetailProfileBox>
        <S.ProductDetailInfoBox>
          <S.ProductDetailInfoParagraph>아내가 제 아이패드 팔아서 저도 샤넬백 팝니다.</S.ProductDetailInfoParagraph>
          <S.ProductDetailInfoText type="bold">100,000원</S.ProductDetailInfoText>
          <S.ProductDetailLocationBox>
            <CiLocationOn size={23} />
            <S.ProductDetailText>우리집 앞</S.ProductDetailText>
          </S.ProductDetailLocationBox>
          <S.ProductDetailInfoParagraph>
            진품은 맞고요 얼마인지는 모르겠고 아내가 제 아이패드 마음대로 팔아서 저도 똑같이 샤넬백 팝니다. 다시
            돌려달라고 안할거고 요 아내도요.월요일쯤 채팅목록 랜덤뽑기해서 연락드릴게요
          </S.ProductDetailInfoParagraph>
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

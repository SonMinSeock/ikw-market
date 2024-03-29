import React from "react";
import styled from "styled-components";
import Image from "../../components/common/atoms/Image";
import UserInfo from "./organism/UserInfo";
import ProductInfo from "./organism/ProductInfo";
import Button from "../../components/common/atoms/Button";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProduct } from "../../api/productData";
import { getUser } from "../../api/userData";

const ProductDetailLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 64px 0px;
  overflow: hidden;
  @media screen and (max-width: 860px) {
    padding-left: 14px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const imageStyle = {
  position: "relative",
  width: "680px",
  height: "450px",
  borderRadius: "10px",
  objectFit: "cover",
  margin: "0 auto",
  mediaQuery: {
    width: "290px",
    height: "230px",
  },
};

const buttonStyle = {
  cursor: "pointer",
  width: "150px",
  height: "50px",
  backgroundColor: "#ffaa22",
  borderRadius: "14px",
  border: "1px solid #ffaa22",
  color: "#ffffff",
  fontFamily: "GmarketSansMedium",
  fontSize: "16px",
  textDecoration: "none",
  margin: "30px auto",
};

const ProductDetail = () => {
  const { id } = useParams() as { id: string };
  // console.log(useRecoilValue(userAtom));
  // recoil에 중요한 데이터는 빼는게 좋을 듯 email, 닉네임, 소셜아이디? 나머지는 서버에 저장된걸로
  // 근데 만약 클라이언트에서 서버로 요청할때는 어떻게? ex) 프로필
  // jwt 토큰을 이용해서 데이터 요청 하면될듯!!
  const { isLoading, data: product } = useQuery(["Product", id], () => getProduct(id), {
    staleTime: 3000,
    refetchInterval: 200000,
    refetchIntervalInBackground: true,
  });
  const { data: user } = useQuery(["User"], getUser, {
    staleTime: 3000,
    refetchInterval: 200000,
    refetchIntervalInBackground: true,
  });

  // 로딩 스켈레톤 로딩바 추가 해야 할듯
  if (isLoading || !product) {
    return <p>Loading...</p>;
  }

  return (
    <ProductDetailLayout>
      <Image style={imageStyle} src={product.images[0]} alt="상품사진" />
      <UserInfo user={product.seller_info} />
      <ProductInfo product={product} />

      {product?.seller_info._id === user?._id ? (
        <ButtonGroup>
          <Button style={buttonStyle}>삭제하기</Button>
          <Button style={buttonStyle}>수정하기</Button>
          <Button style={buttonStyle}>판매완료</Button>
        </ButtonGroup>
      ) : (
        <Button style={buttonStyle}>채팅하기</Button>
      )}
    </ProductDetailLayout>
  );
};

export default ProductDetail;

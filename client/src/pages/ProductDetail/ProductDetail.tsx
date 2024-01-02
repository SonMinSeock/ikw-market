import React from "react";
import styled from "styled-components";
import Image from "../../components/common/atoms/Image";
import UserInfo from "./organism/UserInfo";
import ProductInfo from "./organism/ProductInfo";
import Button from "../../components/common/atoms/Button";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProduct } from "../../api/productData";

const ProductDetailLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 64px 0px;
  overflow: hidden;
  @media screen and (max-width: 860px) {
    padding-left: 14px;
  }
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

  const { isLoading, data: product } = useQuery(["Product", id], () => getProduct(id), {
    staleTime: 3000,
    refetchInterval: 200000,
    refetchIntervalInBackground: true,
  });

  // 로딩 스켈레톤 로딩바 추가 해야 할듯
  if (isLoading || !product) {
    return <p>Loading...</p>;
  }
  console.log(product);
  return (
    <ProductDetailLayout>
      <Image style={imageStyle} src={product.images[0]} alt="상품사진" />
      <UserInfo user={product.seller_info} />
      <ProductInfo product={product} />
      <Button style={buttonStyle}>채팅하기</Button>
    </ProductDetailLayout>
  );
};

export default ProductDetail;

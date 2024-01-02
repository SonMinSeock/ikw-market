import React from "react";
import styled from "styled-components";
import Text from "../../../components/common/atoms/Text";
import Paragraph from "../../../components/common/atoms/Paragraph";
import { CiLocationOn } from "react-icons/ci";
import { IProduct } from "../../../types/productType";

// type으로 해놓긴 했으나 좀 애매해서 살펴볼 필요
type ProductType = {
  product: IProduct;
};

const ProductInfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  min-width: 680px;
`;
const LocationLayout = styled.div`
  display: flex;
  align-items: center;
  border: none;
  font-size: 0.8rem;
  opacity: 0.65;
`;

const nameStyle = {
  marginTop: "16px",
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "1.5",
  letterSpacing: "-0.6px",
};

const priceStyle = {
  display: "flex",
  fontSize: "18px",
  fontWeight: "bold",
};

const paragraphStyle = {
  display: "flex",
  fontSize: "17px",
};
const ProductInfo = ({ product }: ProductType) => {
  console.log(product);
  return (
    <ProductInfoLayout>
      <Text style={nameStyle}>{product.name}</Text>
      <Text style={priceStyle}>{product.price}</Text>
      <LocationLayout>
        <CiLocationOn size={20} />
        <Text>{product.price}</Text>
      </LocationLayout>
      <Paragraph style={paragraphStyle}>{product.description}</Paragraph>
    </ProductInfoLayout>
  );
};

export default ProductInfo;

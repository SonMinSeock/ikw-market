import React from "react";
import styled from "styled-components";
import Image from "../common/atoms/Image";
import ProductCardInfo from "./organism/\bProductCardInfo";
import { Link } from "react-router-dom";
type Props = { product: any };

const ProductLayout = styled.div`
  /* cursor: pointer; */
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  width: 200px;
`;

const ProductCard = ({ product }: Props) => {
  return (
    <ProductLayout>
      <Link to={`/product/${product._id}`}>
        <Image
          src={product.images[0]}
          alt={"상품이미지"}
          style={{
            width: "199px",
            height: "184px",
            borderRadius: "10px 10px 0px 0px",
            objectFit: "cover",
            cursor: "pointer",
          }}
        />
      </Link>
      <ProductCardInfo name={product.name} price={product.price} location={product.location} />
    </ProductLayout>
  );
};

export default ProductCard;

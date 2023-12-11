import React from "react";
import styled from "styled-components";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { IProduct } from "../../../types/productType";

interface Props {
  products: IProduct[];
}

const ProductListLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  flex-wrap: wrap;
  margin-top: 42px;
  gap: 25px;
  justify-content: center;

  @media screen and (max-width: 300px) {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }

  @media screen and (max-width: 580px) {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }
`;

const ProductList = ({ products }: Props) => {
  return (
    <ProductListLayout>
      {products.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </ProductListLayout>
  );
};

export default ProductList;

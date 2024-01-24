import React, { ReactElement } from "react";
import styled from "styled-components";
import Text from "../../common/atoms/Text";

type Props = {
  name: string;
  price: string;
  location: string;
};

const ProductCardInfoLayout = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  padding: 10px;
`;

const ProductCardInfo = ({ name, price, location }: React.PropsWithChildren<Props>) => {
  return (
    <ProductCardInfoLayout>
      <Text style={{ fontWeight: "700", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</Text>
      <Text style={{ fontWeight: "700" }}>{price}</Text>
      <Text style={{ fontWeight: "200", fontSize: "13", wordBreak: "break-all" }}>{location}</Text>
    </ProductCardInfoLayout>
  );
};

export default ProductCardInfo;

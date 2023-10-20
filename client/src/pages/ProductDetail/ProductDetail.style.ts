import styled from "styled-components";
import { Button } from "../../components/Modal/Modal.style";

export const ProductDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px 0px;
  width: 100%;
`;

export const ProductDetailLayout = styled.div`
  max-width: 680px;
  padding-top: 1rem;
  @media screen and (max-width: 860px) {
    max-width: 290px;
  }
`;

export const ProductDetailProfileBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  padding: 1rem 0rem;
  & svg {
    margin-right: 0.5rem;
  }
`;

export const ProductDetailText = styled.span`
  margin-right: 0.5rem;
  &:last-child {
    margin-right: 0px;
  }
`;

export const ProductDetailInfoBox = styled.div``;

export const ProductDetailInfoParagraph = styled.p`
  display: flex;
  padding: 1.6rem 0rem;
  word-break: break-all;
`;

export const ProductDetailInfoText = styled.span<{ type?: string }>`
  display: flex;
  font-weight: ${(props) => (props.type === "bold" ? props.type : "600")};
`;

export const ProductDetailLocationBox = styled(ProductDetailProfileBox)`
  border: none;
  font-size: 0.8rem;
`;

export const ProductDetailViewBox = styled(ProductDetailProfileBox)`
  border: none;
  font-size: 0.8rem;
  color: gray;
`;
export const ButtonRow = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 45px;
`;
export const ProductDetailBtn = styled.button`
  cursor: pointer;
  display: flex;
  width: 150px;
  /* width: 100%; */
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #ffc901;
  border: none;
  color: #fff;
  font-size: 20px;
`;

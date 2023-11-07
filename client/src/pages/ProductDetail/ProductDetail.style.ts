import styled from "styled-components";
import { Button } from "../../components/Modal/Modal.style";

export const ProductDetailBox = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px 0px;
  width: 100%;
`;

export const ProductDetailLayout = styled.section`
  max-width: 680px;
  padding-top: 1rem;
  @media screen and (max-width: 860px) {
    max-width: 290px;
  }
`;
export const ProductDetailImgbox = styled.section`
  position: relative;
  width: 680px;
  height: 450px;
  border-radius: 10px;
  object-fit: cover;

  @media screen and (max-width: 860px) {
    width: 290px;
    height: 230px;
  }
`;

export const ProductDetailProfileBox = styled.section`
  text-decoration: none;
  display: flex;
  margin-top: 25px;
  padding-bottom: 23px;
  position: relative;
  border-bottom: 1px solid #e9ecef;
  align-items: center;
  & svg {
    margin-right: 0.5rem;
  }
`;
export const ProductDetailName = styled.span`
  margin-top: 16px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -0.6px;
`;
export const ProductDetailText = styled.span`
  font-size: 17px;
  line-height: 1.6;
  letter-spacing: -0.6px;
  &:last-child {
    margin-right: 0px;
  }
`;

export const ProductDetailInfoBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ProductDetailInfoParagraph = styled.p`
  display: flex;
  word-break: break-all;
  font-size: 17px;
`;

export const ProductDetailInfoText = styled.span`
  display: flex;
  font-size: 18px;
  font-weight: bold;
`;

export const ProductDetailLocationBox = styled(ProductDetailProfileBox)`
  display: flex;
  align-items: center;
  border: none;
  font-size: 0.8rem;
  opacity: 0.65;
`;

export const ProductDetailViewBox = styled(ProductDetailProfileBox)`
  border: none;
  font-size: 0.8rem;
  color: gray;
`;
export const ButtonRow = styled.section`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 45px;
`;
export const ProductDetailBtn = styled.button`
  cursor: pointer;
  width: 150px;
  height: 50px;
  background-color: #ffaa22;
  border-radius: 14px;
  border: 1px solid #ffaa22;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 16px;
  font-family: GmarketSansMedium;
  text-decoration: none;
`;

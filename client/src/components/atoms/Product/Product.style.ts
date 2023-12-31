import styled from "styled-components";

export const ProductLayout = styled.article`
  /* cursor: pointer; */
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  padding: 10px;
`;

export const ProductImgBox = styled.figure`
  position: relative;
`;

export const ProductImg = styled.img<{ type?: string }>`
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
`;
export const ProductInfoBox = styled.figcaption`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
`;

export const ProductTitle = styled.h2`
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 860px) {
    font-size: 0.7rem;
  }
`;
export const ProductPriceSpan = styled.span`
  font-weight: 700;
  @media screen and (max-width: 860px) {
    font-size: 0.7rem;
  }
`;
export const ProductLocationSpan = styled.span`
  font-weight: 200;
  font-size: 13px;
  word-break: break-all;
`;

export const ButtonRow = styled.section`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 45px;
`;
export const ProductDetailBtn = styled.button`
  cursor: pointer;
  width: 100%;
  background-color: #ffaa22;
  border-radius: 8px;
  border: 1px solid #ffaa22;
  padding: 0.5rem 0;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 12px;
  font-family: GmarketSansMedium;
  text-decoration: none;
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

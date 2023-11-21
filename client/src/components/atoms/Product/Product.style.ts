import styled from "styled-components";

export const ProductLayout = styled.article`
  /* cursor: pointer; */
`;

export const ProductImgBox = styled.figure`
  position: relative;
  @media screen and (max-width: 860px) {
  }
`;

export const ProductImg = styled.img<{ type?: string }>`
  width: ${(props) => (props.type === "thumbnail" ? "220px" : "320px")};
  height: 230px;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
  @media screen and (max-width: 860px) {
    width: 100%;
    height: 134px;
  }
  /* @media screen and (max-width: 369px) {
    width: 86px;
    height: 86px;
  } */
`;
export const ProductInfoBox = styled.figcaption`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  cursor: pointer;
`;

export const ProductTitle = styled.h2`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  border-radius: 10px;
  border: 1px solid #ffaa22;
  padding: 0.5rem 0;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 13px;
  font-family: GmarketSansMedium;
  text-decoration: none;
`;

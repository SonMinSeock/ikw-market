import styled from "styled-components";

export const ProductLayout = styled.article`
  cursor: pointer;
  @media screen and (max-width: 860px) {
    display: flex;
  }
`;

export const ProductImgBox = styled.figure`
  position: relative;
  @media screen and (max-width: 860px) {
    display: flex;
    gap: 10px;
  }
`;

export const ProductImg = styled.img<{ type?: string }>`
  width: ${(props) => (props.type === "thumbnail" ? "220px" : "320px")};
  height: 230px;
  border-radius: 10px;
  object-fit: cover;
  @media screen and (max-width: 860px) {
    width: ${(props) => (props.type === "thumbnail" ? "100px" : "200px")};
    height: 100px;
  }
  @media screen and (max-width: 369px) {
    width: 86px;
    height: 86px;
  }
`;
export const ProductInfoBox = styled.figcaption`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
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

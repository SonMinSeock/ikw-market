import styled from "styled-components";

export const ProductLayout = styled.div`
  margin-bottom: 50px;
`;
export const ProductImg = styled.img<{ type?: string }>`
  width: ${(props) => (props.type === "thumbnail" ? "220px" : "320px")};
  border-radius: 10px;
  height: 220px;
  object-fit: cover;
  @media screen and (max-width: 860px) {
    width: ${(props) => (props.type === "thumbnail" ? "100px" : "200px")};
    height: 100px;
  }
`;
export const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

export const ProductTitle = styled.h2`
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

import styled from "styled-components";

export const ProductInfoBarLayout = styled.div`
  border-bottom: 1px solid #dfe1e2;
  display: flex;
  padding: 5px;
  background-color: #f2f2f2;
`;
export const ProductInfoBarImg = styled.div`
  border-radius: 5px;
  width: 60px;
  height: 60px;
  img {
    border-radius: 5px;
    object-fit: cover;
    width: 60px;
    height: 60px;
  }
`;
export const ProductInfoBarDetailBox = styled.div`
  display: flex;
  font-size: 14px;
  flex-direction: column;
  padding: 10px 0px 10px 0px;
  justify-content: space-between;
  margin-left: 15px;
`;
export const ProductInfoBarName = styled.div``;
export const ProductInfoBarPrice = styled.div`
  font-weight: bold;
`;

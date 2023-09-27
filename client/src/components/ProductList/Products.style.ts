import styled from "styled-components";

export const ProductsLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 42px;
  gap: 25px;
`;

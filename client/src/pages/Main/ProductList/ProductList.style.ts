import styled from "styled-components";

export const ProductsLayout = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  flex-wrap: wrap;
  margin-top: 42px;
  gap: 25px;
  padding: 20px;
  @media screen and (max-width: 860px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
  }
`;

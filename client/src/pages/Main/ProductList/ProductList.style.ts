import styled from "styled-components";

export const ProductsLayout = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  flex-wrap: wrap;
  margin-top: 42px;
  gap: 25px;
  justify-content: center;

  @media screen and (max-width: 300px) {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }

  @media screen and (max-width: 580px) {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }
`;

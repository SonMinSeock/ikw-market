import styled from "styled-components";

export const MainLayout = styled.main`
  display: flex;
  flex-direction: column;
  padding-top: 64px;
  padding-bottom: 20px;
  width: 768px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 860px) {
    width: auto;
    padding-left: 10px;
    padding-right: 10px;
  }
`;
export const MainTitle = styled.h1`
  font-size: 32px;
  margin-top: 35px;
  font-family: "GmarketSansMedium";
`;
export const MainSection = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 42px auto 0px auto;
  gap: 25px;
`;

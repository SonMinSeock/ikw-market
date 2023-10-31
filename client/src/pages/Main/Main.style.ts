import styled from "styled-components";

export const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 64px;
  justify-content: center;
  align-items: center;
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

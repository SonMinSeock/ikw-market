import styled from "styled-components";

export const ProfileLayout = styled.main`
  display: flex;
  flex-direction: column;
  padding-top: 64px;
  padding-bottom: 40px;
  width: 780px;
  margin: 0 auto;
  gap: 10px;
  @media screen and (max-width: 860px) {
    width: 100vw;
    padding-left: 10px;
    padding-right: 10px;
  }
`;
export const UserHeader = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;

  @media screen and (max-width: 860px) {
  }
`;
export const UserImg = styled.img`
  width: 200px;
  border-radius: 100px;
  @media screen and (max-width: 860px) {
    width: 100px;
  }
`;
export const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  justify-content: center;
  width: 100%;
  gap: 30px;
  @media screen and (max-width: 860px) {
  }
`;
export const UserNameSpan = styled.div``;
export const UserUpdateBtn = styled.button`
  height: 20px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px 5px;
  color: rgb(136, 136, 136);
  border: 1px solid rgb(238, 238, 238);
  font-size: 11px;
`;

export const UserProductList = styled.section`
  //background-color: red;
  border-top: 0.3px solid #2f2f2f;
  display: flex;
  flex-direction: column;
  padding-left: 11px;
  margin-top: 23px;
`;
export const UserProductTitle = styled.h3`
  display: flex;
  width: 100%;
  margin-top: 24px;
  font-size: 16px;
  font-family: "GmarketSansMedium";
`;

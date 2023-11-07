import styled from "styled-components";

export const UploadLayout = styled.main`
  display: flex;
  flex-direction: column;
  padding-top: 64px;
  padding-bottom: 40px;
  width: 680px;
  margin: 0 auto;
  gap: 10px;
  @media screen and (max-width: 860px) {
    width: 100vw;
    padding-left: 10px;
    padding-right: 10px;
  }
`;
export const UploadTitle = styled.h2`
  font-size: 23px;
  margin-bottom: 10px;
  border-bottom: solid 2px #ffaa22;
  padding: 18px 0px 10px 0px;
`;
export const UploadImgBox = styled.section`
  overflow: hidden;
`;
export const UploadImgList = styled.article`
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 20px;
  @media screen and (max-width: 500px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
export const UploadImgBtn = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  color: grey;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 200px;
  height: 200px;
  flex: 0 0 auto;
`;
export const UploadImgRow = styled.div`
  display: flex;
  position: relative;
  div {
    cursor: pointer;
    position: absolute;
    right: 0;
  }
`;
export const UploadImgItem = styled.img`
  flex: 0 0 auto;
  border-radius: 10px;
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

export const UploadImgInput = styled.input`
  display: none;
`;

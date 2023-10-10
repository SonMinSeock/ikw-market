import styled from "styled-components";

export const UploadLayout = styled.div`
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
`;
export const UploadImgBox = styled.div`
  overflow: hidden;
`;
export const UploadImgList = styled.div`
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

export const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #000;
`;
export const UploadInputBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 56px;

  label {
    display: flex;
    width: 100px;
  }
  span {
    position: absolute;
    right: 0;
    margin-right: 10px;
  }
`;
export const UploadInput = styled.input`
  height: 42px;
  border-radius: 10px;
  border: 1px solid rgb(204, 204, 204);
  width: 100%;
  padding: 0px 1rem;
  &:focus {
    outline: 2px solid #ffc901;
    border: none;
  }
`;
export const UploadTextAreaBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const UploadTextArea = styled.textarea`
  resize: none;
  border-radius: 10px;
  border: 0.3px solid #000;
  height: 240px;
  border: 1px solid rgb(204, 204, 204);
  padding: 1rem;
  &:focus {
    outline: 2px solid #ffc901;
    border: none;
  }
`;
export const UploadFormBtn = styled.button`
  cursor: pointer;
  display: flex;
  width: 150px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #ffc901;
  border: none;
  color: #fff;
  font-size: 22px;
  margin: 0 auto;
`;

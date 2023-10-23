import styled from "styled-components";

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
export const CharacterLength = styled.div`
  position: absolute;
  right: 0;
  margin-right: 10px;
`;
export const UploadTextAreaBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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
  width: 150px;
  height: 50px;
  background-color: #ffaa22;
  border-radius: 14px;
  border: 1px solid #ffaa22;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 18px;
  font-family: GmarketSansMedium;
  padding: 6px 28px;
  text-decoration: none;
  margin: 0 auto;
`;

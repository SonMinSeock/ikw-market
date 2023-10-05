import styled from "styled-components";

export const ImgWrap = styled.div`
  width: 100%;
  height: 100%;

  img {
    display: block;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  button {
    background: none;
    border: none;
    right: 0;
    top: 0;
    position: absolute;
  }
`;
export const Button = styled.button`
  position: absolute;
  bottom: 0;
  background: none;
  border: none;
`;

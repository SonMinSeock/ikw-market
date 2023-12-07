import React from "react";
import styled from "styled-components";
import LogoImage from "../../../assets/logo/logo.png";
type Props = {
  // onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

// 로고는 재사용해도 스타일 유지 되어서 바로 스타일 적용

const Button = styled.section`
  display: flex;
  /* margin-bottom: 1rem; */
  & img {
    width: 65px;
    height: 65px;
    margin-right: 0.3rem;
  }

  & h2 {
    font-size: 1.3rem;
    margin: 0;
    display: flex;
    align-items: center;
    margin-top: 15px;
    font-family: "GmarketSansMedium";
  }
`;

const Logo = (props: React.PropsWithChildren<Props>) => {
  return (
    <Button>
      <img src={LogoImage} alt="로고 이미지" />
      {props.children}
    </Button>
  );
};

export default Logo;

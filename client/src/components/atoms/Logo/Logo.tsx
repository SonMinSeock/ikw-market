import * as S from "./Logo.style";
import LogoImage from "../../../assets/logo/logo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoBox = styled.section`
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

const Logo = () => {
  return (
    <Link to={"/"}>
      <LogoBox>
        <img src={LogoImage} alt="로고 이미지" />
        <h2>경운마켓</h2>
      </LogoBox>
    </Link>
  );
};

export default Logo;

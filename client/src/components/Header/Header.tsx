import React, { useState } from "react";
import * as S from "./Header.style";
import Logo from "../atoms/Logo/Logo";
import Nav from "../atoms/Nav/Nav";
import { searchTextAtom } from "../../recoil/login/atoms";
import { useRecoilState } from "recoil";
const Header = () => {
  const [searchText, setSearchText] = useRecoilState(searchTextAtom);
  const [inputValue, setInputValue] = useState("");

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.trim());
  };

  const activeEnter = (event: any) => {
    if (event.key === "Enter") {
      setSearchText(inputValue);
    }
  };

  return (
    <S.Header>
      <Logo />
      <S.Input placeholder="물품 검색" onChange={onChangeSearchInput} onKeyDown={activeEnter} value={inputValue} />
      {/* <S.Input placeholder="물품 검색" onChange={onChangeSearchInput} value={searchText} /> */}
      <Nav />
    </S.Header>
  );
};

export default Header;

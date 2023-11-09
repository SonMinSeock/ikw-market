import React, { useState } from "react";
import * as S from "./Header.style";
import Logo from "../atoms/Logo/Logo";
import Nav from "./Nav/Nav";
import { searchTextAtom } from "../../recoil/login/atoms";
import { useSetRecoilState } from "recoil";
const Header = () => {
  const setSearchText = useSetRecoilState(searchTextAtom);
  const [isToggle, setIsToggle] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.trim());
  };

  const activeEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchText(inputValue);
    }
  };

  const onFocusHandler = () => {
    isToggle && setIsToggle(false);
  };

  return (
    <S.Header>
      <Logo />
      <S.Input
        placeholder="물품 검색"
        onChange={onChangeSearchInput}
        onKeyDown={activeEnter}
        onFocus={onFocusHandler}
        value={inputValue}
      />
      <Nav isToggle={isToggle} setIsToggle={setIsToggle} />
    </S.Header>
  );
};

export default Header;

import styled from "styled-components";

export const Nav = styled.nav``;
export const NavList = styled.ul`
  display: flex;
  width: 460px;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  @media screen and (max-width: 860px) {
    display: none;
  }
`;
export const NavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  list-style-type: none;
`;
export const ToogleBtn = styled.div`
  font-size: 30px;
  cursor: pointer;
  @media screen and (min-width: 860px) {
    display: none;
  }
`;

export const MenuBox = styled.div<{ $isMenu: boolean }>`
  position: absolute;
  right: 0;
  background-color: #fff;
  margin-top: 10px;
  margin-right: 10px;
  display: ${(prop) => (prop.$isMenu ? "flex" : "none")};
  @media screen and (min-width: 860px) {
    display: none;
  }
`;
export const MenuList = styled.ul``;
export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 54px;
  border-bottom: 1px solid #c6c6c6;
  cursor: pointer;
  span {
    width: 80px;
  }
`;

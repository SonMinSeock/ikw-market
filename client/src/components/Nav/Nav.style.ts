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
export const MenuBox = styled.div`
  font-size: 30px;
  @media screen and (min-width: 860px) {
    display: none;
  }
`;

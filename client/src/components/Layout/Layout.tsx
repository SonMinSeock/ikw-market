import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  const isLogin = !!localStorage.getItem("kakao_token");
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;

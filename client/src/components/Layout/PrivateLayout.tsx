import { Outlet, Navigate } from "react-router-dom";

const PrivateLayout = () => {
  const isLogin = !!localStorage.getItem("kakao_token");
  return isLogin ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateLayout;

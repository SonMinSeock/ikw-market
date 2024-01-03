import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../recoil/login/atoms";

const PrivateLayout = () => {
  const isLogin = useRecoilValue(isLoginAtom);
  return isLogin ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateLayout;

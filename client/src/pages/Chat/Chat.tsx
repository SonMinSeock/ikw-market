import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../recoil/login/atoms";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const isLogin = useRecoilValue(isLoginAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin === false) navigate("/login");
  }, []);

  return <div>Chat</div>;
};

export default Chat;

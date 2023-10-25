import React from "react";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../recoil/login/atoms";

const ChatList = () => {
  const isLogin = useRecoilValue(isLoginAtom);
  console.log(isLogin);
  return <div>ChatList</div>;
};

export default ChatList;

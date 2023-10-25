import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../recoil/login/atoms";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import * as S from "./Chat.style";

const Chat = () => {
  const socket = io("http://localhost:3002");

  const isLogin = useRecoilValue(isLoginAtom);
  const navigate = useNavigate();

  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState<any[]>([]);

  useEffect(() => {
    if (isLogin === false) navigate("/login");
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  }, [socket]);

  const onTextChange = (e: any) => {
    console.log("state : ", state);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e: any) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit("message", { name, message });
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}:<span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <S.FormBox>
      <form onSubmit={onMessageSubmit}>
        <h1>Message</h1>
        <div>
          <input placeholder="name" name="name" onChange={(e) => onTextChange(e)} value={state.name} />
        </div>
        <div>
          <input placeholder="message" name="message" onChange={(e) => onTextChange(e)} value={state.message} />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat log</h1>
        {renderChat()}
      </div>
    </S.FormBox>
  );
};

export default Chat;

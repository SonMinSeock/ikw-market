import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { isLoginAtom } from "../../recoil/login/atoms";
import * as S from "./Chat.style";

interface ChatMessage {
  name: string;
  message: string;
}

const Chat = () => {
  const isLogin = useRecoilValue(isLoginAtom);
  const navigate = useNavigate();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState<ChatMessage[]>([]);

  // 소켓 연결 함수
  const connectSocket = () => {
    const socketServer = io("http://localhost:3002");
    setSocket(socketServer);

    // 컴포넌트 언마운트 시 실행되는 클린업 함수
    return () => {
      if (socketServer) {
        socketServer.disconnect();
      }
    };
  };

  // 로그인 유무 체크, 소켓 연결 호출
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    } else {
      return connectSocket();
    }
  }, [navigate, isLogin]);

  // socket연결 시 이벤트 리스너 등록
  useEffect(() => {
    socket?.on("message", ({ name, message }) => {
      setChat((prevChat) => [...prevChat, { name, message }]);
    });
  }, [socket]);

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, message } = state;

    socket?.emit("message", { name, message });
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
          <input placeholder="name" name="name" onChange={onTextChange} value={state.name} />
        </div>
        <div>
          <input placeholder="message" name="message" onChange={onTextChange} value={state.message} />
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

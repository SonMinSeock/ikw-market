import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../recoil/login/atoms";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client"; // Socket 타입 추가
import * as S from "./Chat.style";

const Chat = () => {
  const [socket, setSocket] = useState<Socket | null>(null); // Socket 상태 추가
  const isLogin = useRecoilValue(isLoginAtom);
  const navigate = useNavigate();

  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState<any[]>([]);

  useEffect(() => {
    if (isLogin === false) navigate("/login");

    // 컴포넌트가 마운트될 때 소켓 연결을 설정
    const newSocket = io("http://localhost:3002");
    setSocket(newSocket);

    // 연결 해제 함수를 반환하여 컴포넌트가 언마운트될 때 연결을 해제
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [navigate, isLogin]);

  useEffect(() => {
    // Socket 연결이 설정되었을 때만 메시지 이벤트를 처리
    if (socket) {
      socket.on("message", ({ name, message }) => {
        setChat([...chat, { name, message }]);
      });
    }
  }, [socket, chat]);

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, message } = state;
    if (socket) {
      socket.emit("message", { name, message });
    }
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

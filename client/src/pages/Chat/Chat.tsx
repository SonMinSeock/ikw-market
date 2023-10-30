import React, { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { isLoginAtom } from "../../recoil/login/atoms";
import { HiArrowCircleUp } from "react-icons/hi";
import * as S from "./Chat.style";
import Message from "../../components/atoms/Message/Message";

interface ChatMessage {
  name: string;
  message: string;
}

const Chat = () => {
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const isLogin = useRecoilValue(isLoginAtom);
  const navigate = useNavigate();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [connected, setConnected] = useState<Boolean>(false);
  // 소켓 연결 함수
  const connectSocket = () => {
    const socketServer = io("http://localhost:3002/chat");

    //소켓 연결 실패
    socketServer.on("connect_error", (error) => {
      console.error("Socket connection failed:", error);
      setConnected(false);
    });

    // 채팅방 입장하면 채팅방 id로 보내 해당 채팅방 id 접속한 유저와 채팅한다.
    socketServer.emit("enter_room", { roomId: 123 });
    setConnected(true);
    setSocket(socketServer);

    // 컴포넌트 언마운트 시 실행되는 클린업 함수
    return () => {
      if (socketServer) {
        socketServer.disconnect();
        setConnected(false);
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

  useEffect(() => {
    // socket연결 시 이벤트 리스너 등록
    socket?.on("message", ({ name, message }) => {
      setChat((prevChat) => [...prevChat, { name, message }]);
    });
  }, [socket]);

  // 렌더링 될때마다 스크롤 맨 아래로 되게 하기
  useEffect(() => {
    (scrollRef.current as any).scrollTop = (scrollRef.current as any).scrollHeight;
  });

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, message } = state;

    socket?.emit("message", { name, message, roomId: 123 });
    setState({ message: "", name });
  };

  return (
    <S.ChatLayout>
      <S.ChatHeaderBox>
        <h3>손민석(상대방 이름)</h3>
      </S.ChatHeaderBox>
      <S.ChatContentBox>
        <S.ChatLogBox ref={scrollRef as any}>
          <Message />
        </S.ChatLogBox>
        <S.InputBox>
          <S.Input
            placeholder=" 메시지를 입력하세요"
            ref={inputRef}
            type="text"
            value={messageInput}
            disabled={!connected}
            onChange={(e) => {
              setMessageInput(e.target.value);
              (inputRef.current as any).focus();
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                // sendMessage();
              }
            }}
          />
          <S.Button
          // disabled={messageInput ? false : true} onClick={(e) => sendMessage()}
          >
            <HiArrowCircleUp size={35} />
          </S.Button>
        </S.InputBox>
      </S.ChatContentBox>
    </S.ChatLayout>
  );
};

export default Chat;

import React, { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { isLoginAtom, userAtom } from "../../recoil/login/atoms";
import { HiArrowCircleUp } from "react-icons/hi";
import * as S from "./Chat.style";
import Message from "../../components/atoms/Message/Message";

interface IChatMessage {
  user: any;
  message: String;
  createdAt: String;
  profileImage: any;
  name: any;
}

const Chat = () => {
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const isLogin = useRecoilValue(isLoginAtom);

  const user = useRecoilValue(userAtom);

  const navigate = useNavigate();
  const location = useLocation();
  const chatInfo = location.state;
  const roomId = chatInfo._id;
  console.log(chatInfo);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [chat, setChat] = useState<IChatMessage[]>([]);
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
    socketServer.emit("enter_room", { roomId });
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
    socket?.on("message", (message) => {
      setChat((prevChat) => [...prevChat, message]);
    });
  }, [socket]);

  // 렌더링 될때마다 스크롤 맨 아래로 되게 하기
  useEffect(() => {
    (scrollRef.current as any).scrollTop = (scrollRef.current as any).scrollHeight;
  });

  const onMessageSubmit = (e: any) => {
    e.preventDefault();
    const createdAt = new Date().toLocaleTimeString("ko-KR", { hour: "numeric", minute: "numeric" });
    const chatMessage: IChatMessage = {
      user: user._id,
      message: messageInput,
      profileImage: user.profile_image,
      name: user.nickname,
      createdAt,
    };

    if (socket) {
      socket.emit("message", chatMessage, { roomId });
    }

    setMessageInput("");
    setChat((prevChat) => [...prevChat, chatMessage]);
  };

  return (
    <S.ChatLayout>
      <S.ChatHeaderBox>
        <h3>손민석(상대방 이름)</h3>
      </S.ChatHeaderBox>
      <S.ChatContentBox>
        <S.ChatLogBox ref={scrollRef as any}>
          <Message chatMessages={chat} />
        </S.ChatLogBox>
        <S.InputBox>
          <S.Input
            placeholder="메시지를 입력하세요"
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
                onMessageSubmit(e);
              }
            }}
          />
          <S.Button disabled={messageInput ? false : true} onClick={(e) => onMessageSubmit(e)}>
            <HiArrowCircleUp size={35} />
          </S.Button>
        </S.InputBox>
      </S.ChatContentBox>
    </S.ChatLayout>
  );
};

export default Chat;

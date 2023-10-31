import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { isLoginAtom, userAtom } from "../../recoil/login/atoms";
import { HiArrowCircleUp } from "react-icons/hi";
import * as S from "./Chat.style";
import Message from "../../components/atoms/Message/Message";

interface IChatMessage {
  user: any;
  message: string;
  createdAt: string;
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

  const [socket, setSocket] = useState<Socket | null>(null);
  const [chat, setChat] = useState<IChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);

  // Socket connection logic
  useEffect(() => {
    const connectSocket = () => {
      const socketServer = io("http://localhost:3002/chat");

      socketServer.on("connect_error", (error) => {
        console.error("Socket connection failed:", error);
        setConnected(false);
      });

      socketServer.emit("enter_room", { roomId });
      setConnected(true);
      setSocket(socketServer);

      return () => {
        if (socketServer) {
          socketServer.disconnect();
          setConnected(false);
        }
      };
    };

    if (!isLogin) {
      navigate("/login");
    } else {
      return connectSocket();
    }
  }, [navigate, isLogin]);

  useEffect(() => {
    if (socket) {
      socket?.on("message", (message) => {
        setChat((prevChat) => [...prevChat, message]);
      });
    }
  }, [socket]);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      (scrollRef.current as any).scrollTop = (scrollRef.current as any).scrollHeight;
    }
  }, [chat]);

  const onMessageSubmit = (e: any) => {
    e.preventDefault();
    const createdAt = new Date().toLocaleTimeString("ko-KR", {
      hour: "numeric",
      minute: "numeric",
    });
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
  };

  console.log(chat);
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
              if (e.key === "Enter" && messageInput) {
                onMessageSubmit(e);
              }
            }}
          />
          <S.Button disabled={!messageInput} onClick={onMessageSubmit}>
            <HiArrowCircleUp size={35} />
          </S.Button>
        </S.InputBox>
      </S.ChatContentBox>
    </S.ChatLayout>
  );
};

export default Chat;

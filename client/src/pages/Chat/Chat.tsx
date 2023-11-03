import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { isLoginAtom, userAtom } from "../../recoil/login/atoms";
import { HiArrowCircleUp } from "react-icons/hi";
import * as S from "./Chat.style";
import Message from "../../components/atoms/Message/Message";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { getChatRoom, setChatRoomMessageLog } from "../../api/chatData";
import { IChatMessage, IChatRoom, ISetChatRoomMessageLog } from "../../api/chatType";

// interface IChatMessage {
//   send_user: any;
//   message: string;
//   send_date: string;
// }

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

  const [chat, setChat] = useState<IChatRoom>();
  const [chatMessageLog, setChatMessageLog] = useState<IChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);

  const { mutate: mutateChaRoomMessageLog } = useMutation(({ message, roomId }: ISetChatRoomMessageLog) =>
    setChatRoomMessageLog({ message, roomId })
  );

  // message 기록해주는 함수.
  // const writeMessageLogAPI = async (message: IChatMessage) => {
  //   const { state } = await (
  //     await axios.post(`https://ikw-market.shop/api/chats/chat/${roomId}`, { message }, { withCredentials: true })
  //   ).data;
  // };

  const { isLoading: getChatRoomIsLoading, data } = useQuery(["GetChatRoom", roomId], () => getChatRoom(roomId), {
    onSuccess: (chatRoom) => setChatMessageLog([...chatRoom.message_log]),
  });

  // const readChatRoomMessageAPI = async () => {
  //   const { state, chatRoom } = await (
  //     await axios.get(`https://ikw-market.shop/api/chats/${roomId}`, { withCredentials: true })
  //   ).data;

  //   setChat([...chatRoom.message_log]);
  // };

  // useEffect(() => {
  //   // readChatRoomMessageAPI();
  // }, []);

  // Socket connection logic
  useEffect(() => {
    const connectSocket = () => {
      const socketServer = io(`${process.env.REACT_APP_EXPRESS_URL}/chat`);

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
        //setChat((prevChat) => [...prevChat, message]);
        setChatMessageLog((prevChatMessageLog) => [...prevChatMessageLog, message]);
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
      send_user: user,
      message: messageInput,
      send_date: createdAt,
    };

    if (socket) {
      socket.emit("message", chatMessage, { roomId });
    }

    setMessageInput("");
    mutateChaRoomMessageLog({ message: chatMessage, roomId });
    // writeMessageLogAPI(chatMessage);
  };

  return (
    <S.ChatLayout>
      <S.ChatHeaderBox>
        <h3>손민석(상대방 이름)</h3>
      </S.ChatHeaderBox>
      <S.ChatContentBox>
        <S.ChatLogBox ref={scrollRef as any}>
          <Message chatMessages={chatMessageLog} />
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

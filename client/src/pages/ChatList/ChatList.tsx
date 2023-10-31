import { useEffect, useState } from "react";
import * as S from "./ChatList.style";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/login/atoms";
const ChatList = () => {
  const user = useRecoilValue<any>(userAtom);
  const navigate = useNavigate();
  // const [chatRoom, setChatRoom] = useState([]);

  // const getChatRoomAPI = async () => {
  //   const { chatRoom } = await (
  //     await axios.get(`http://localhost:3002/chats/${user._id}`, { withCredentials: true })
  //   ).data;
  //   setChatRoom(chatRoom);
  // };
  // useEffect(() => {
  //   getChatRoomAPI();
  // }, []);

  console.log("Chat List : ", user?.chat_room);

  const onRedirectProductEdit = (chat: any) => {
    console.log(chat);
    return navigate(`../chat/${chat._id}`, { state: chat });
  };
  return (
    <S.ChatListLayout>
      <S.ChatListTitle>대화 목록</S.ChatListTitle>
      <S.ChatList>
        {user?.chat_room.map((chat: any) => (
          <S.ChatListItem onClick={() => onRedirectProductEdit(chat)} key={chat._id}>
            <S.ChatListProfileImg src={chat?.message_log[chat?.message_log.length - 1]?.send_user?.profile_image} />
            <S.ChatListInfoBox>
              <S.ChatListUserName>
                {chat?.message_log[chat?.message_log.length - 1]?.send_user?.nickname}
              </S.ChatListUserName>
              <S.ChatListMessages>{chat?.message_log[chat?.message_log.length - 1]?.message}</S.ChatListMessages>
            </S.ChatListInfoBox>
            <S.ChatListTime>{chat?.message_log[chat?.message_log.length - 1]?.send_date}</S.ChatListTime>
          </S.ChatListItem>
        ))}
      </S.ChatList>
    </S.ChatListLayout>
  );
};

export default ChatList;

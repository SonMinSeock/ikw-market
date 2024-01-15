import * as S from "./ChatList.style";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IUser } from "../../types/userType";
import { IChatRoom } from "../../types/chatType";
import { getOtherUserProfileInfo } from "../../controller/chat";

const ChatList = () => {
  const navigate = useNavigate();

  const onRedirectProductEdit = (chat: any) => {
    return navigate(`../chat/${chat._id}`, { state: chat });
  };

  return (
    <S.ChatListLayout>
      <S.ChatListTitle>대화 목록</S.ChatListTitle>
      <S.ChatList>
        {/*  api 요청으로 수정 하기 */}
        {/* {user?.chat_rooms.map((chatRoom: IChatRoom) => (
          <S.ChatListItem onClick={() => onRedirectProductEdit(chatRoom)} key={chatRoom._id}>
            <div>
              <S.ChatListProfileImg src={getOtherUserProfileInfo(chatRoom, user).profileImg} alt="사진" />
            </div>
            <S.ChatListInfoBox>
              <S.ChatListUserName>{getOtherUserProfileInfo(chatRoom, user).nickname}</S.ChatListUserName>
              <S.ChatListMessages>
                {chatRoom?.message_log[chatRoom?.message_log.length - 1]?.message}
              </S.ChatListMessages>
            </S.ChatListInfoBox>
            <S.ChatListTime>{chatRoom?.message_log[chatRoom?.message_log.length - 1]?.send_date}</S.ChatListTime>
          </S.ChatListItem>
        ))} */}
      </S.ChatList>
    </S.ChatListLayout>
  );
};

export default ChatList;

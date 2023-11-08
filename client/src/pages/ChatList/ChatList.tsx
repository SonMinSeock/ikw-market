import * as S from "./ChatList.style";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/login/atoms";
import { IUser } from "../../types/userType";
import { IChatRoom } from "../../types/chatType";
const ChatList = () => {
  const user = useRecoilValue<IUser>(userAtom);
  const navigate = useNavigate();

  const onRedirectProductEdit = (chat: any) => {
    return navigate(`../chat/${chat._id}`, { state: chat });
  };

  // 상대방의 이미지, 닉네임 반환 해주는 함수
  const showProfileImgAndNickname = (chat: any): any => {
    let show;
    if (!chat) {
      show = ["", ""];
    }
    if (chat) {
      chat?.member_list.forEach((userInfo: any) => {
        if (userInfo._id !== user._id) {
          show = [userInfo.image, userInfo.nickname];
        }
      });
    }

    return show;
  };

  return (
    <S.ChatListLayout>
      <S.ChatListTitle>대화 목록</S.ChatListTitle>
      <S.ChatList>
        {user?.chat_rooms.map((chat: IChatRoom) => (
          <S.ChatListItem onClick={() => onRedirectProductEdit(chat)} key={chat._id}>
            <S.ChatListProfileImg src={showProfileImgAndNickname(chat)[0]} alt="사진" />
            <S.ChatListInfoBox>
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

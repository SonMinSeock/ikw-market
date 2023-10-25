import * as S from "./ChatList.style";
const ChatList = () => (
  <S.ChatListLayout>
    <S.ChatListTitle>대화 목록</S.ChatListTitle>
    <S.ChatList>
      <S.ChatListItem>
        <S.ChatListProfileImg src="https://avatars.githubusercontent.com/u/102671646?v=4" />
        <S.ChatListInfoBox>
          <S.ChatListUserName>박해준</S.ChatListUserName>
          <S.ChatListMessages>여기에 최근 메시지</S.ChatListMessages>
        </S.ChatListInfoBox>
        <S.ChatListTime>오전 7:40</S.ChatListTime>
      </S.ChatListItem>
    </S.ChatList>
  </S.ChatListLayout>
);

export default ChatList;

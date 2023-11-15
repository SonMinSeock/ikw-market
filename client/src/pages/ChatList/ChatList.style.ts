import styled from "styled-components";

export const ChatListLayout = styled.main`
  display: flex;
  flex-direction: column;
  padding-top: 64px;
  padding-bottom: 40px;
  width: 680px;
  margin: 0 auto;
  gap: 10px;
  @media screen and (max-width: 860px) {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const ChatListTitle = styled.h1`
  font-size: 30px;
  margin-top: 21px;
  padding: 0px 10px;
  font-family: "GmarketSansMedium";
`;
export const ChatList = styled.ul``;

export const ChatListItem = styled.li`
  align-items: center;
  display: flex;
  gap: 10px;
  height: 78px;
  padding: 0px 10px;
  margin: 15px 0px;
  background-color: rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const ChatListProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  object-fit: cover;
  /* ChatListProfileImg의 스타일을 원하는 대로 추가하세요 */
`;

export const ChatListInfoBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  /* ChatListInfoBox의 스타일을 원하는 대로 추가하세요 */
  @media screen and (max-width: 860px) {
    width: 50%;
  }
`;

export const ChatListUserName = styled.div`
  font-weight: 600;
  /* ChatListUserName의 스타일을 원하는 대로 추가하세요 */
`;

export const ChatListMessages = styled.div`
  color: rgb(178, 178, 178);
  font-size: 12px;
  /* ChatListMessages의 스타일을 원하는 대로 추가하세요 */
  overflow: hidden;
  width: 300px;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media screen and (max-width: 860px) {
    width: 135px;
  }
`;

export const ChatListTime = styled.section`
  min-width: 60px;
  font-size: 12px;
  color: rgb(178, 178, 178);
  /* ChatListTime의 스타일을 원하는 대로 추가하세요 */
`;

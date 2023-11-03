import axios from "axios";
import { ISetChatRoomMessageLog } from "./chatType";

const setChatRoomMessageLog = async ({ message, roomId }: ISetChatRoomMessageLog) => {
  const { state } = await (
    await axios.post(`https://ikw-market.shop/api/chats/chat/${roomId}`, { message }, { withCredentials: true })
  ).data;

  return state;
};

const getChatRoom = async (roomId: number) => {
  const { state, chatRoom } = await (
    await axios.get(`https://ikw-market.shop/api/chats/${roomId}`, { withCredentials: true })
  ).data;

  return chatRoom;
};

export { setChatRoomMessageLog, getChatRoom };

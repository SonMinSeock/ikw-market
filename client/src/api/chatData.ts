import axios from "axios";
import { ICreatedChatRoom, ISetChatRoomMessageLog } from "./chatType";

const createdChatRoom = async ({ productId }: ICreatedChatRoom) => {
  const res = await (
    await axios.post(`${process.env.REACT_APP_EXPRESS_URL}/api/chats/${productId}`, {}, { withCredentials: true })
  ).data;

  return res;
};

const setChatRoomMessageLog = async ({ message, roomId }: ISetChatRoomMessageLog) => {
  const { state } =
    await // await axios.post(`https://ikw-market.shop/api/chats/chat/${roomId}`, { message }, { withCredentials: true })
    (
      await axios.post(
        `${process.env.REACT_APP_EXPRESS_URL}/api/chats/chat/${roomId}`,
        { message },
        { withCredentials: true }
      )
    ).data;

  return state;
};

const getChatRoom = async (roomId: number) => {
  const { state, chatRoom } =
    await // await axios.get(`https://ikw-market.shop/api/chats/${roomId}`, { withCredentials: true })
    (
      await axios.get(`${process.env.REACT_APP_EXPRESS_URL}/api/chats/${roomId}`, { withCredentials: true })
    ).data;

  return chatRoom;
};

export { setChatRoomMessageLog, getChatRoom, createdChatRoom };

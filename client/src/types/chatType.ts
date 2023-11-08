import { IUser } from "./userType";

interface ICreatedChatRoom {
  productId: string;
}

interface IChatMessage {
  send_user: IUser;
  message: string;
  send_date: string;
}

interface ISetChatRoomMessageLog {
  message: IChatMessage;
  roomId: number;
}

interface IChatRoom {
  consumer: {
    message_read_count: number;
  };
  seller: {
    message_read_count: number;
  };
  _id: string;
  title: string;
  message_log: IChatMessage[] | [];
  member_list: object[];
  product: object;
  created_at: string;
  __v: number;
}

export type { ICreatedChatRoom, IChatMessage, ISetChatRoomMessageLog, IChatRoom };

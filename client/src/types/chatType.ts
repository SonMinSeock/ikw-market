import { IProduct } from "./productType";
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
  member_list: IUser[];
  product: IProduct;
  _id: string;
  title: string;
  message_log: IChatMessage[] | [];
  created_at: string;
  __v: number;
}

export type { ICreatedChatRoom, IChatMessage, ISetChatRoomMessageLog, IChatRoom };

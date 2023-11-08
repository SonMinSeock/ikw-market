import { IChatRoom } from "./chatType";
import { IProduct } from "./productType";

interface IUser {
  chat_rooms: IChatRoom[] | [];
  email: string;
  nickname: string;
  on_sale: IProduct[];
  profile_image: string;
  social_id: { value: number; social_name: string };
  __v: number;
  _id: string;
}

export type { IUser };

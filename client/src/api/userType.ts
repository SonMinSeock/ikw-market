interface IUser {
  chat_room: [];
  email: string;
  nickname: string;
  products_on_sale: any[];
  profile_image: string;
  social_id: { value: number; social_name: string };
  __v: number;
  _id: string;
}

export type { IUser };

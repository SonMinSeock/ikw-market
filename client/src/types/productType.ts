export interface IProduct {
  description: string;
  location: string;
  images: any;
  name: string;
  price: string;
  state: boolean;
  seller_info: {
    chat_rooms: string[];
    email: string;
    image: string;
    nickname: string;
    on_sale: string[];
    social_id: {
      value: number;
      social_name: string;
    };
    __v: number;
    _id: string;
  };
  __v: number;
  _id: string;
}

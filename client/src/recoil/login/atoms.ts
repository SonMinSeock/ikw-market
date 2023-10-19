import { atom } from "recoil";
interface IUserAtom {
  chat_room: [];
  email: string;
  nickname: string;
  products_on_sale: [];
  profile_image: string;
  social_id: { value: number; social_name: string };
  __v: number;
  _id: string;
}
export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});

export const userAtom = atom<IUserAtom>({
  key: "user",
  default: {
    chat_room: [],
    email: "",
    nickname: "",
    products_on_sale: [],
    profile_image: "",
    social_id: { value: 0, social_name: "" },
    __v: 0,
    _id: "",
  },
});

export const accessTokenAtom = atom({
  key: "kakaoToken",
  default: "",
});

export const searchTextAtom = atom({
  key: "searchText",
  default: "",
});

export const searchProductsAtom = atom({
  key: "searchProducts",
  default: [],
});

import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
interface IUserAtom {
  chat_rooms: [];
  email: string;
  nickname: string;
  on_sale: any[];
  profile_image: string;
  social_id: { value: number; social_name: string };
  __v: number;
  _id: string;
}
export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userAtom = atom<IUserAtom>({
  key: "user",
  default: {
    chat_rooms: [],
    email: "",
    nickname: "",
    on_sale: [],
    profile_image: "",
    social_id: { value: 0, social_name: "" },
    __v: 0,
    _id: "",
  },
});

export const accessTokenAtom = atom({
  key: "kakaoToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const searchTextAtom = atom({
  key: "searchText",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const searchProductsAtom = atom({
  key: "searchProducts",
  default: [],
});

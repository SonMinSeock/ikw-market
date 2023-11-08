import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { IUser } from "../../types/userType";

const { persistAtom } = recoilPersist();

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userAtom = atom<IUser>({
  key: "user",
  default: {
    chat_rooms: [],
    email: "",
    nickname: "",
    on_sale: [],
    image: "",
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

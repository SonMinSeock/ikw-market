import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { IUser } from "../../types/userType";

const { persistAtom } = recoilPersist();

export const isLoginAtom = atom({
  key: "isLogin",
  default: !!document.cookie
    .split("; ")
    .find((row) => row.startsWith("refreshToken="))
    ?.split("=")[1],
  effects_UNSTABLE: [persistAtom],
});

export const accessTokenAtom = atom({
  key: "kakaoToken",
  default: "",
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

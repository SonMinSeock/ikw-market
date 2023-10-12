import { atom } from "recoil";

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});

export const userAtom = atom({
  key: "user",
  default: {},
});

export const accessTokenAtom = atom({
  key: "kakaoToken",
  default: "",
});

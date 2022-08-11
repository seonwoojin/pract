import { atom } from "recoil";

export const isLogined = atom({
  key: "isLogined",
  default: false,
});

export const isShow = atom({
  key: "isShow",
  default: false,
});

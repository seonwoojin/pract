import { atom } from "recoil";

export const isLogined = atom({
  key: "isLogined",
  default: false,
});

export const isShow = atom({
  key: "isShow",
  default: false,
});

export const isSelected = atom({
  key: "isSelected",
  default: "",
});

export const isFilterShow = atom({
  key: "isFilter",
  default: false,
});

export const chainString = atom({
  key: "chainString",
  default: "",
});

export const projectString = atom({
  key: "projectString",
  default: "",
});

export const snstString = atom({
  key: "snstString",
  default: "",
});

export const todayString = atom({
  key: "today",
  default: new Date(),
});

export const pastString = atom({
  key: "past",
  default: new Date(),
});

export const subscirbeProject = atom<string[]>({
  key: "subscirbeProject",
  default: [],
});

export const themeMode = atom({
  key: "theme",
  default: localStorage.getItem("mode") !== "false",
});

export const onlyDark = atom({
  key: "onlyDark",
  default: localStorage.getItem("onlyInfoDark")
    ? localStorage.getItem("onlyInfoDark") !== "false"
    : false,
});

export const blinkPost = atom({
  key: "blinkPost",
  default: localStorage.getItem("blinkTime")
    ? parseInt(localStorage.getItem("blinkTime")!)
    : 8,
});

export const recentPost = atom({
  key: "recentPost",
  default: localStorage.getItem("recentPostDate")
    ? parseInt(localStorage.getItem("recentPostDate")!)
    : 14,
});

import Router from "koa-router";
import { userChecker } from "../../../middlewares";
import {
  getUserData,
  postJoin,
  postLogin,
  showUserFavorite,
  userFavoriteNft,
} from "./userController";

const user = new Router();

user.post("/login", postLogin);
user.post("/join", postJoin);
user.get("/favorite/choose", userChecker, userFavoriteNft);
user.get("/favorite", userChecker, showUserFavorite);
user.get("/data", userChecker, getUserData);

export default user;

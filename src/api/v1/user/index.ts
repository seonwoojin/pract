import Router from "koa-router";
import { postJoin, postLogin } from "./userController";

const user = new Router();

user.post("/login", postLogin);
user.post("/join", postJoin);

export default user;

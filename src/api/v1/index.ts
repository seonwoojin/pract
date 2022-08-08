import Router from "koa-router";
import user from "./user";

const v1 = new Router();

v1.use("/user", user.routes());

export default v1;

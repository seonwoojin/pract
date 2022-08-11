import Router from "koa-router";
import user from "./user";
import admin from "./admin/index";

const v1 = new Router();

v1.use("/user", user.routes());
v1.use("/admin", admin.routes());

export default v1;

import Router from "koa-router";
import user from "./user";
import admin from "./admin/index";
import nft from "./nft";

const v1 = new Router();

v1.use("/user", user.routes());
v1.use("/admin", admin.routes());
v1.use("/nft", nft.routes());

export default v1;

import Router from "koa-router";
import { adminChecker, postAdmin } from "./adminController";
import { userChecker } from "./../../../middlewares";

const admin = new Router();

admin.post("/upload", postAdmin);
admin.get("/check", userChecker, adminChecker);

export default admin;

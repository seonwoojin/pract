import Router from "koa-router";
import { adminChecker, postAdmin } from "./adminController";

const admin = new Router();

admin.post("/upload", postAdmin);
admin.get("/check", adminChecker);

export default admin;

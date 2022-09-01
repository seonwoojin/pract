import Router from "koa-router";
import { adminChecker, postAdmin, uploadImage } from "./adminController";
import { upload, userChecker } from "./../../../middlewares";

const admin = new Router();

admin.post("/img", upload.single("img"), uploadImage);
admin.post("/upload", postAdmin);
admin.get("/check", userChecker, adminChecker);

export default admin;

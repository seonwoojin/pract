import Router from "koa-router";
import {
  adminChecker,
  deletePost,
  postAdmin,
  updatePost,
  uploadImage,
} from "./adminController";
import { upload, userChecker } from "./../../../middlewares";

const admin = new Router();

admin.post("/img", upload.single("img"), uploadImage);
admin.post("/upload", userChecker, postAdmin);
admin.get("/check", userChecker, adminChecker);
admin.delete("/delete", userChecker, deletePost);
admin.patch("/update", userChecker, updatePost);

export default admin;

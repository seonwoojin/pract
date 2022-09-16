import Router from "koa-router";
import {
  adminChecker,
  copyTemporary,
  deleteImage,
  deletePost,
  deleteTemporary,
  postAdmin,
  updatePost,
  uploadImage,
} from "./adminController";
import { upload, userChecker } from "./../../../middlewares";

const admin = new Router();

admin.post("/img", upload.single("img"), uploadImage);
admin.post("/delete/img", deleteImage);
admin.post("/upload", userChecker, postAdmin);
admin.get("/check", userChecker, adminChecker);
admin.post("/delete", userChecker, deletePost);
admin.patch("/update", userChecker, updatePost);
admin.get("/reset", userChecker, deleteTemporary);
admin.post("/reset/edit", userChecker, copyTemporary);

export default admin;

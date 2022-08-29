import Router from "koa-router";
import multer from "koa-multer";
import { adminChecker, postAdmin, uploadImage } from "./adminController";
import { userChecker } from "./../../../middlewares";
import path from "path";
import koaBody from "koa-body";

const admin = new Router();

interface MulterRequest extends Request {
  file: any;
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "public/uploads");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
});
admin.post("/img", upload.single("img"), uploadImage);
admin.post("/upload", postAdmin);
admin.get("/check", userChecker, adminChecker);

export default admin;

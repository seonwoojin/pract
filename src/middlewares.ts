import { Cookies } from "react-cookie";
import { response } from "./constants/response";
import jwt from "jsonwebtoken";
import User from "./models/User";
import multer from "koa-multer";
import path from "path";
import { CopyObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import koa, { Context } from "koa";

const cookies = new Cookies();
const accessKey = process.env.ACCESS_SECRET_KEY;

const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ID!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

interface IDecoded {
  username: string;
  iat: number;
  exp: number;
}

export const setCookie = (name: string, value: string, option?: any) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const userChecker = async (
  ctx: Context,
  next: (ctx: Context) => Promise<any>
) => {
  try {
    const token = ctx.req.headers.authorization?.replace("Bearer ", "");
    if (token == "undefined") {
      ctx.status = response.HTTP_OK;
      ctx.body = null;
      return;
    }
    const decoded = jwt.verify(token!, accessKey!) as IDecoded;
    const user = await User.findOne({ username: decoded.username }).exec();
    if (!user) {
      ctx.status = response.HTTP_OK;
      ctx.body = null;
      return;
    }
    ctx.user = user;
    await next(ctx);
  } catch (error) {
    console.log(error);
    ctx.body = error;
    ctx.status = response.HTTP_BAD_REQUEST;
    return false;
  }
};

const multerUploader = multerS3({
  s3: s3,
  bucket: "blueroombucket",
  acl: "public-read",
  key: function (req, file, cb) {
    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    cb(
      null,
      //@ts-ignore
      `temporary/${req.headers.username}/${basename}-${Date.now()}${extension}`
    );
  },
});

export const upload = multer({
  storage: multerUploader as any,
});

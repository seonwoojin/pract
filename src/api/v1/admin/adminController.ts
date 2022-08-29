import koa, { Context } from "koa";
import { INftInfo } from "./../../../Routes/Admin";
import NftInfo from "./../../../models/NftInfo";
import { response } from "../../../constnats/response";
import jwt from "jsonwebtoken";
import User from "./../../../models/User";
import { userChecker } from "../../../middlewares";

const accessKey = process.env.ACCESS_SECRET_KEY;

interface IDecoded {
  username: string;
  iat: number;
  exp: number;
}

export const postAdmin = async (ctx: Context) => {
  console.log(ctx);
};

export const adminChecker = async (ctx: Context) => {
  try {
    const user = ctx.user;
    ctx.body = user.admin;
    ctx.status = response.HTTP_OK;
  } catch (error) {
    ctx.status = response.HTTP_BAD_REQUEST;
    ctx.body = error;
    return;
  }
};

export const uploadImage = async (ctx: Context) => {
  const file = (ctx.req as any).file;
  const IMG_URL = `http://localhost:3000/uploads/${file.filename}`;
  ctx.body = IMG_URL;
  ctx.status = response.HTTP_OK;
  return;
};

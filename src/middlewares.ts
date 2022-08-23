import { Context } from "koa";
import { Cookies } from "react-cookie";
import { response } from "./constnats/response";
import jwt from "jsonwebtoken";
import User from "./models/User";
import { useEffect, useRef } from "react";

const cookies = new Cookies();
const accessKey = process.env.ACCESS_SECRET_KEY;

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
    return false;
  }
};

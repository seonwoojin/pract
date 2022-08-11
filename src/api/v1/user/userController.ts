import Koa, { Context } from "koa";
import User from "../../../models/User";
import { response } from "./../../../constnats/response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const postLogin = async (ctx: Context) => {
  try {
    const { username, password } = ctx.request.body;
    const user = await User.findOne({ username });

    const accessKey = process.env.ACCESS_SECRET_KEY;
    const refreshKey = process.env.REFRESH_SECRET_KEY;

    if (!user) {
      ctx.status = response.HTTP_BAD_REQUEST;
      ctx.body = "An account with this username does not exitst.";
      return;
    }
    const ok = await bcrypt.compare(password, user.password!);
    if (!ok) {
      ctx.status = response.HTTP_BAD_REQUEST;
      ctx.body = "Wrong password.";
      return;
    }
    const accessToken = jwt.sign({ username }, accessKey!, { expiresIn: "6h" });
    const refreshToken = jwt.sign({ username }, refreshKey!, {
      expiresIn: "180 days",
    });

    ctx.body = { accessToken, refreshToken };
    ctx.status = response.HTTP_OK;
  } catch (error) {
    ctx.status = response.HTTP_BAD_REQUEST;
  }
};

export const postJoin = async (ctx: Context) => {
  const { username, name, password, confirm_password } = ctx.request.body;
  if (password != confirm_password) {
    ctx.status = response.HTTP_BAD_REQUEST;
    ctx.body = "Password confirmation does not match.";
    return;
  }

  const usernameExists = await User.exists({ username });

  if (usernameExists) {
    ctx.status = response.HTTP_BAD_REQUEST;
    ctx.body = "This username/email is already taken.";
    return;
  }

  try {
    await User.create({
      username,
      name,
      password,
    });
    ctx.status = response.HTTP_OK;
  } catch (error) {
    ctx.status = response.HTTP_BAD_REQUEST;
    ctx.body = error;
    return;
  }
};

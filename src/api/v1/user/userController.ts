import Koa, { Context } from "koa";
import User, { IUser } from "../../../models/User";
import { response } from "../../../constants/response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nft from "./../nft/index";
import { userChecker } from "./../../../middlewares";
import Post from "./../../../models/Post";

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
    console.log(error);
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

export const userFavoriteNft = async (ctx: Context) => {
  const params = ctx.query;
  const user: IUser = ctx.user;
  const preNfts: string[] = [];
  if (user.favoriteNft.includes(params.nft as string)) {
    user.favoriteNft.map((nft) => {
      if (nft !== params.nft) preNfts.push(nft);
    });
    user.favoriteNft = preNfts;
  } else {
    user.favoriteNft.push(params.nft as string);
  }
  user.save();
  ctx.status = response.HTTP_OK;
};

export const showUserFavorite = async (ctx: Context) => {
  const user: IUser = ctx.user;
  ctx.body = user.favoriteNft;
  ctx.status = response.HTTP_OK;
};

export const getUserData = async (ctx: Context) => {
  try {
    const user: IUser = ctx.user;
    ctx.body = user;
    ctx.status = response.HTTP_OK;
  } catch {
    ctx.status = response.HTTP_BAD_REQUEST;
  }
};

export const getUserReadPost = async (ctx: Context) => {
  try {
    const user: IUser = ctx.user;
    const post = await Post.find({ user: user.id });
    ctx.body = post;
    ctx.status = response.HTTP_OK;
  } catch {
    ctx.status = response.HTTP_BAD_REQUEST;
  }
};

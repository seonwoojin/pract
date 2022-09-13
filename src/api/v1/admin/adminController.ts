import koa, { Context } from "koa";
import { INftInfo } from "./../../../Routes/Admin";
import NftInfo from "./../../../models/NftInfo";
import { response } from "../../../constants/response";
import jwt from "jsonwebtoken";
import User from "./../../../models/User";
import { userChecker } from "../../../middlewares";
import { snstString } from "./../../../atom";

export const postAdmin = async (ctx: Context) => {
  const {
    chain,
    nft,
    title,
    thumbnail,
    description,
    SNS,
    createdAt,
  }: INftInfo = ctx.request.body;
  try {
    const user = ctx.user;
    if (!user.admin) {
      ctx.status = response.HTTP_BAD_REQUEST;
      return;
    }
    await NftInfo.create({
      chain,
      nft,
      title,
      thumbnail,
      description,
      SNS,
      createdAt,
    });
    ctx.status = response.HTTP_OK;
  } catch (error) {
    console.log(error);
    ctx.status = response.HTTP_BAD_REQUEST;
    ctx.body = error;
    return;
  }
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
  console.log(file);
  //const IMG_URL = `http://localhost:3000/uploads/${file.filename}`;
  const IMG_URL = file.location;
  ctx.body = IMG_URL;
  ctx.status = response.HTTP_OK;
  return;
};

export const deletePost = async (ctx: Context) => {
  const user = ctx.user;
  if (!user.admin) {
    ctx.status = response.HTTP_BAD_REQUEST;
    return;
  }
  const query = ctx.query;
  await NftInfo.deleteOne({ _id: query.nft });
  ctx.status = response.HTTP_OK;
  return;
};

export const updatePost = async (ctx: Context) => {
  const {
    chain,
    nft,
    title,
    thumbnail,
    description,
    SNS,
    createdAt,
    _id,
  }: INftInfo = ctx.request.body;
  try {
    await NftInfo.findByIdAndUpdate(_id, {
      chain,
      nft,
      title,
      thumbnail,
      description,
      SNS,
      createdAt,
    });
    ctx.status = response.HTTP_OK;
    return;
  } catch (error) {
    ctx.status = response.HTTP_BAD_REQUEST;
    ctx.body = error;
    return;
  }
};

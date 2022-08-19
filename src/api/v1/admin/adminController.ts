import { Context } from "koa";
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

import { Context } from "koa";
import NftInfo from "./../../../models/NftInfo";
import { response } from "../../../constants/response";
import User, { IUser } from "../../../models/User";
import Post from "../../../models/Post";
import mongoose from "mongoose";

export const getNftInfo = async (ctx: Context) => {
  const nftInfo = await NftInfo.find({ nft: ctx.query.nft }).sort({
    createdAt: -1,
  });
  ctx.body = nftInfo;
  ctx.status = response.HTTP_OK;
};

export const getAllNftInfo = async (ctx: Context) => {
  const nftInfo = await NftInfo.find({}).sort({
    createdAt: -1,
  });
  ctx.body = nftInfo;
  ctx.status = response.HTTP_OK;
};

export const getNftInfoDetail = async (ctx: Context) => {
  try {
    const nftInfo = await NftInfo.findById(ctx.params.id).exec();
    ctx.body = nftInfo;
    ctx.status = response.HTTP_OK;
  } catch (error) {
    ctx.body = error;
    ctx.status = response.HTTP_BAD_REQUEST;
  }
};

export const userLikeDetailInfo = async (ctx: Context) => {
  try {
    const user: IUser = ctx.user;
    const query = ctx.query;
    const preLikes: string[] = [];
    if (user.likes.includes(query.post as string)) {
      user.likes.map((like) => {
        if (like !== query.post) {
          preLikes.push(like);
        }
      });
      user.likes = preLikes;
    } else {
      user.likes.push(query.post as string);
    }
    user.save();
    ctx.status = response.HTTP_OK;
  } catch (error) {
    ctx.status = response.HTTP_BAD_REQUEST;
    return;
  }
};

export const userRecommendDetailInfo = async (ctx: Context) => {
  try {
    const user: IUser = ctx.user;
    const query = ctx.query;
    const preLikes: string[] = [];
    const preUnLikes: string[] = [];
    const info = await NftInfo.findById(query.post).exec();
    if (query.dir === "up") {
      if (info?.likes.includes(user.id as string)) {
        info?.likes.map((like) => {
          if (like !== user.id) {
            preLikes.push(user.id);
          }
        });
        info.likes = preLikes;
      } else {
        info?.likes.push(user.id as string);
      }
      if (info?.unlikes.includes(user.id as string)) {
        info?.unlikes.map((unLike) => {
          if (unLike !== user.id) {
            preUnLikes.push(unLike);
          }
        });
        info.unlikes = preUnLikes;
      }
    } else if (query.dir === "down") {
      if (info?.unlikes.includes(user.id as string)) {
        info?.unlikes.map((unLike) => {
          if (unLike !== user.id) {
            preUnLikes.push(unLike);
          }
        });
        info.unlikes = preUnLikes;
      } else {
        info?.unlikes.push(user.id as string);
      }
      if (info?.likes.includes(user.id as string)) {
        info?.likes.map((like) => {
          if (like !== user.id) {
            preLikes.push(like);
          }
        });
        info.likes = preLikes;
      }
    }
    info?.save();
    ctx.status = response.HTTP_OK;
  } catch (error) {
    ctx.status = response.HTTP_BAD_REQUEST;
    return;
  }
};

export const searchNftInfo = async (ctx: Context) => {
  try {
    const params = ctx.query;
    let nfts = [];
    nfts = await NftInfo.find({
      title: { $regex: new RegExp(params.keyword as string, "i") },
    }).sort({
      createdAt: -1,
    });
    ctx.body = nfts;
    ctx.status = response.HTTP_OK;
  } catch (error) {
    ctx.body = error;
    ctx.status = response.HTTP_BAD_REQUEST;
  }
};

export const postRead = async (ctx: Context) => {
  try {
    const { id } = ctx.query;
    const user: IUser = ctx.user;
    const post = await Post.exists({ user: user.id, post: id });
    if (!post) {
      await Post.create({ user: user.id, post: id });
    }
    ctx.status = response.HTTP_OK;
  } catch (error) {
    ctx.body = error;
    ctx.status = response.HTTP_BAD_REQUEST;
  }
};

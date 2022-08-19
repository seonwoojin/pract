import Router from "koa-router";
import {
  getNftInfo,
  userLikeDetailInfo,
  userRecommendDetailInfo,
} from "./nftController";
import { Context } from "koa";
import { userChecker } from "./../../../middlewares";

const nft = new Router();

nft.get("/", getNftInfo);
nft.get("/like", userChecker, userLikeDetailInfo);
nft.get("/recommend", userChecker, userRecommendDetailInfo);

export default nft;

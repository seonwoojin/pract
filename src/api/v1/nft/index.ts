import Router from "koa-router";
import {
  getAllNftInfo,
  getNftInfo,
  getNftInfoDetail,
  searchNftInfo,
  userLikeDetailInfo,
  userRecommendDetailInfo,
} from "./nftController";
import { Context } from "koa";
import { userChecker } from "./../../../middlewares";

const nft = new Router();

nft.get("/", getNftInfo);
nft.get("/all", getAllNftInfo);
nft.get("/like", userChecker, userLikeDetailInfo);
nft.get("/recommend", userChecker, userRecommendDetailInfo);
nft.get("/search", searchNftInfo);
nft.get("/info/:id", getNftInfoDetail);

export default nft;

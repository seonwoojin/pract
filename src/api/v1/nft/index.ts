import Router from "koa-router";
import {
  getAllNftInfo,
  getNftInfo,
  getNftInfoDetail,
  postRead,
  projectRecentData,
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
nft.get("/read", userChecker, postRead);
nft.get("/recent", projectRecentData);

export default nft;

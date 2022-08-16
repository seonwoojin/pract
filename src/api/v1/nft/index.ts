import Router from "koa-router";
import { getNftInfo } from "./nftController";
import { Context } from "koa";

const nft = new Router();

nft.get("/", getNftInfo);

export default nft;

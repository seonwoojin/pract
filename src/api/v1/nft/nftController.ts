import { Context } from "koa";
import NftInfo from "./../../../models/NftInfo";
import { response } from "./../../../constnats/response";

export const getNftInfo = async (ctx: Context) => {
  const nftInfo = await NftInfo.find({ nft: ctx.query.nft });
  ctx.body = nftInfo;
  ctx.status = response.HTTP_OK;
};
